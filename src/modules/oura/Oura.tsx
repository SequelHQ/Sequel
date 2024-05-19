import { useCallback, useEffect, useMemo, useState } from "react";
import {
	getOuraData,
	getOuraDataTypes,
	getOuraFetchedDay,
	getOuraRefreshToken,
	getOuraToken,
	storeOuraData,
	storeOuraDataTypes,
	storeOuraFetchedDay,
	storeOuraRefreshToken,
	storeOuraToken,
} from "src/helpers/storage";
import axios from "axios";
import DataMenu from "./DataMenu";
import { AreaChart, BarChart, Card } from "@tremor/react";
import Spinner from "src/components/spinner";
import { makeInsight } from "src/helpers/utils/makeInsight";

const myWindow = window;
const CHART_SIZE = 90;

const Oura = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [showFilesMenu] = useState<boolean>(true);
	const [ouraToken, setOuraToken] = useState(getOuraToken());
	const [fetchedOuraTypes, setFetchedOuraTypes] = useState(getOuraDataTypes());
	const [sleepChartData, setSleepChartData] = useState<any>();
	const [workoutChartData, setWorkoutChartData] = useState<any>();
	const [spo2ChartData, setSpo2ChartData] = useState<any>();
	const [activityChartData, setActivityChartData] = useState<any>();

	let retries = 0;

	// @ts-ignore
	const { loginWGauth } = myWindow;

	const dataTypesToMenu = useMemo(() => {
		return [
			{
				label: "Sleep",
				isFetched: fetchedOuraTypes.includes("sleep"),
			},
			{
				label: "Workout",
				isFetched: fetchedOuraTypes.includes("workout"),
			},
			{
				label: "Activity",
				isFetched: fetchedOuraTypes.includes("activity"),
			},
			{
				label: "SpO2",
				isFetched: fetchedOuraTypes.includes("spo2"),
			},
			{
				label: "Stress",
				isFetched: fetchedOuraTypes.includes("stress"),
			},
		];
	}, []);

	useEffect(() => {
		if (loginWGauth) {
			loginWGauth.onDataFromElectronOura((data: any) => {
				setOuraToken(data.access_token);
				storeOuraToken(data.access_token);
				storeOuraRefreshToken(data.refresh_token);
			});
		}
	}, []);

	const getFreshOuraTokens = async () => {
		const clientId = process.env.REACT_APP_OURA_CLIENT_ID;
		const clientSecret = process.env.REACT_APP_OURA_CLIENT_SECRET;
		const refreshToken = getOuraRefreshToken();

		if (!refreshToken) return;

		const response = await axios.post(
			"https://api.prod.oura.com/oauth/oauth2/token",
			{
				client_id: clientId,
				client_secret: clientSecret,
				scope: "offline",
				grant_type: "refresh_token",
				refresh_token: refreshToken,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		if (response.status === 200) {
			setOuraToken(response.data.access_token);
			storeOuraToken(response.data.refresh_token);
			storeOuraRefreshToken(response.data.refresh_token);
		} else {
			setOuraToken("");
			storeOuraToken("");
			storeOuraRefreshToken("");
		}
	};

	const getUrlFromType = (type: string) => {
		switch (type) {
		case "spo2":
			return "https://api.ouraring.com/v2/usercollection/daily_spo2";
		case "sleep":
			return "https://api.ouraring.com/v2/usercollection/daily_sleep";
		case "activity":
			return "https://api.ouraring.com/v2/usercollection/daily_activity";
		case "stress":
			return "https://api.ouraring.com/v2/usercollection/daily_stress";
		case "workout":
			return "https://api.ouraring.com/v2/usercollection/workout";
		default:
			return "";
		}
	};

	const getOuraRequest = useCallback(
		async (type: string, nextToken = "") => {
			const allData: any[] = [];
			const fetchData = async (nextToken: string) => {
				const url = getUrlFromType(type);
				try {
					const response = await axios.get(url, {
						params: {
							...(nextToken && { nextToken }),
							start_date: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString().split('T')[0],
							end_date: new Date().toISOString().split('T')[0],
						},
						headers: {
							Authorization: `Bearer ${ouraToken}`,
						},
					});

					if (response.status === 200) {
						const data = response.data.data ?? [];
						allData.push(data);

						if (response.data.next_token) {
							await fetchData(response.data.next_token);
						}
					}
				} catch (error: any) {
					console.error(error);
					if (error.response && error.response.status === 401) {
						if (retries < 3) {
							retries++;
							try {
								await getFreshOuraTokens();
								await fetchData(nextToken);
							} catch (error) {
								console.error(error);
							}
						}
					}
				}
			};

			await fetchData(nextToken);
			return allData.flat();
		},
		[ouraToken]
	);

	const handleGetAllDataFromOura = useCallback(async () => {
		setFetching(true);
		const fetchedTypes: string[] = [];
		const fetchedData: any = {};
		await getOuraRequest("sleep").then((data) => {
			if (!data) return;
			// Reverse the order of the data to ensure the correct order from the API
			data.reverse();
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.sleepData = data.map((sleep: any) => ({
				day: sleep?.day ?? 0,
				score: sleep?.score ?? 0,
				contributors: sleep?.contributors ?? 0,
			}));
			fetchedTypes.push("sleep");
		});
		await getOuraRequest("spo2").then((data) => {
			if (!data) return;
			// Reverse the order of the data to ensure the correct order from the API
			data.reverse();
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.spo2Data = data.map((spo2: any) => ({
				average: spo2.spo2_percentage?.average ?? 0,
				day: spo2?.day ?? 0,
			}));
			fetchedTypes.push("spo2");
		});
		await getOuraRequest("workout").then((data) => {
			if (!data) return;
			// Reverse the order of the data to ensure the correct order from the API
			data.reverse();
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.workoutData = data.map((workout: any) => ({
				day: workout.day ?? 0,
				label: workout.label ?? 0,
				calories: workout.calories ?? 0,
				activity: workout.activity ?? 0,
				distance: workout.distance ?? 0,
				end_datetime: workout.end_datetime ?? 0,
				start_datetime: workout.start_datetime ?? 0,
			}));
			fetchedTypes.push("workout");
		});
		await getOuraRequest("activity").then((data) => {
			if (!data) return;
			// Reverse the order of the data to ensure the correct order from the API
			data.reverse();
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.activityData = data.map((activity: any) => ({
				contributors: activity.contributors,
				equivalent_walking_distance: activity.equivalent_walking_distance,
				high_activity_met_minutes: activity.high_activity_met_minutes,
				sedentary_time: activity.sedentary_time,
				steps: activity.steps,
				active_calories: activity.active_calories,
				resting_time: activity.resting_time,
				total_calories: activity.total_calories,
				target_calories: activity.target_calories,
				day: activity.day,
			}));
			fetchedTypes.push("activity");
		});
		await getOuraRequest("stress").then((data) => {
			if (!data) return;
			// Reverse the order of the data to ensure the correct order from the API
			data.reverse();
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.stressData = data.map((stress: any) => ({
				day: stress.day,
				stress_high: stress.stress_high,
				recovery_high: stress.recovery_high,
				day_summary: stress.day_summary,
			}));
			fetchedTypes.push("stress");
		});
		storeOuraFetchedDay(new Date());
		setFetchedOuraTypes(fetchedTypes);
		if (fetchedTypes.length) {
			storeOuraDataTypes(fetchedTypes);
		}
		if (!!fetchedData.sleepData && !!fetchedData.workoutData) {
			storeOuraData(JSON.stringify(fetchedData));
			makeInsight("oura", JSON.stringify(fetchedData))
		}
		setFetching(false);
	}, [getOuraRequest]);

	const shouldFetchData = (): boolean => {
		const lastDay = getOuraFetchedDay();
		if (!lastDay) {
			return true;
		}
		if (lastDay) {
			if (new Date(lastDay).getDate() !== new Date().getDate()) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	};

	useEffect(() => {
		if (ouraToken && shouldFetchData()) {
			handleGetAllDataFromOura();
		}
		if (getOuraData()) {
			prepareSleepChartData();
			prepareWorkoutChartData();
			prepareSpO2ChartData();
			prepareActivityChartData();
		}
	}, [ouraToken, handleGetAllDataFromOura, fetchedOuraTypes]);

	const prepareSleepChartData = () => {
		// @ts-ignore
		const sleepData = JSON.parse(getOuraData()).sleepData;
		const today = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(today.getDate() - CHART_SIZE);

		const last30DaysSleepData = sleepData.filter((sleep: any) => {
			const sleepDay = new Date(sleep.day);
			return sleepDay >= thirtyDaysAgo;
		});

		const scorePerDay = last30DaysSleepData.reduce((acc: any, curr: any) => {
			const day = new Date(curr.day).toISOString().split("T")[0];
			acc[day] = (acc[day] || 0) + curr.score;
			return acc;
		}, {});

		const chartData = Object.entries(scorePerDay).map(([day, score]) => ({
			name: day,
			"Sleep score": score,
		}));

		chartData.reverse();
		setSleepChartData(chartData);
	};

	const prepareSpO2ChartData = () => {
		// @ts-ignore
		const spo2Data = JSON.parse(getOuraData()).spo2Data;
		const today = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(today.getDate() - CHART_SIZE);
		const last30DaysSpO2Data = spo2Data.filter((entry: any) => {
			const entryDay = new Date(entry.day);
			return entryDay >= thirtyDaysAgo;
		});

		const chartData = last30DaysSpO2Data.map((entry: any) => ({
			name: entry.day,
			"Average SpO2": parseFloat(entry.average.toFixed(2)),
		}));

		chartData.reverse();
		setSpo2ChartData(chartData);
	};

	const prepareWorkoutChartData = () => {
		// @ts-ignore
		const workoutData = JSON.parse(getOuraData()).workoutData;
		const today = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(today.getDate() - CHART_SIZE);

		const last30DaysWorkout = workoutData.filter((workout: any) => {
			const workoutDate = new Date(workout.start_datetime);
			return workoutDate >= thirtyDaysAgo;
		});

		const totalWorkoutPerDay = last30DaysWorkout.reduce(
			(acc: any, curr: any) => {
				const day = new Date(curr.day).toISOString().split("T")[0];
				const workoutDuration =
          // @ts-ignore
          new Date(curr.end_datetime) - new Date(curr.start_datetime);
				acc[day] = (acc[day] || 0) + workoutDuration;
				return acc;
			},
			{}
		);

		const workoutTimePerDayInHours = Object.entries(totalWorkoutPerDay).map(
			([day, durationMs]: any) => ({
				date: day,
				"Workout duration": durationMs / (1000 * 60 * 60),
			})
		);

		const chartdata = workoutTimePerDayInHours.map((day) => ({
			name: day.date,
			"Workout duration": parseFloat(day["Workout duration"].toFixed(2)),
		}));

		chartdata.reverse();
		setWorkoutChartData(chartdata);
	};

	const prepareActivityChartData = () => {
		// @ts-ignore
		const activityData = JSON.parse(getOuraData()).activityData;
		const today = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(today.getDate() - 30);

		const last30DaysActivityData = activityData.filter((activity: any) => {
			const activityDay = new Date(activity.day);
			return activityDay >= thirtyDaysAgo;
		});

		const chartData = last30DaysActivityData.map((activity: any) => ({
			name: activity.day,
			"Active Calories": activity.active_calories,
			"Total Calories": activity.total_calories,
		}));

		chartData.reverse();
		setActivityChartData(chartData);
	};

	return (
		<div className="ml-4 bg-transparent flex h-[calc(100vh-64px)]">
			<div className="bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-1 flex-col items-start p-8 gap-2 overflow-x-hidden shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)]">
				{ouraToken && (
					<button
						onClick={() => {
							setOuraToken("");
							storeOuraToken("");
							storeOuraRefreshToken("");
							storeOuraDataTypes([]);
							storeOuraFetchedDay("" as unknown as Date);
							storeOuraData("");
						}}
						className="border border-white rounded-2xl mr-4 p-2 text-white z-10 self-end mb-4"
					>
            Logout
					</button>
				)}
				{getOuraData() ? (
					<>
						<Card>
							<div className="font-bold text-xl text-white mb-2">
                Calories burned
							</div>
							<div className="text-base font-thin text-white mb-8">
                Last {CHART_SIZE} days
							</div>
							<BarChart
								className="h-40"
								data={activityChartData}
								index="name"
								categories={["Active Calories", "Total Calories"]}
								colors={["blue"]}
								yAxisWidth={62}
								showXAxis={false}
								showLegend={false}
							/>
						</Card>
						<Card className="mt-8">
							<div className="font-bold text-xl text-white mb-2">
                Average SpO2
							</div>
							<div className="text-base font-thin text-white mb-8">
                Last {CHART_SIZE} days
							</div>
							<BarChart
								className="h-40"
								data={spo2ChartData}
								index="name"
								categories={["Average SpO2"]}
								colors={["blue"]}
								valueFormatter={(value) => `${value}%`}
								yAxisWidth={62}
								showXAxis={false}
								showLegend={false}
							/>
						</Card>
						<Card className="mt-8">
							<div className="font-bold text-xl text-white mb-2">
                Sleep Score
							</div>
							<div className="text-base font-thin text-white mb-8">
                Last {CHART_SIZE} days
							</div>
							<AreaChart
								className="h-40"
								data={sleepChartData}
								index="name"
								categories={["Sleep score"]}
								colors={["blue"]}
								yAxisWidth={68}
								showXAxis={false}
								showLegend={false}
							/>
						</Card>
						<Card className="mt-8">
							<div className="font-bold text-xl text-white mb-2">
                Workout duration
							</div>
							<div className="text-base font-thin text-white mb-8">
                Last {CHART_SIZE} days
							</div>
							<BarChart
								className="h-40"
								data={workoutChartData}
								index="name"
								categories={["Workout duration"]}
								colors={["blue"]}
								valueFormatter={(value) => {
									const hours = Math.floor(value);
									const minutes = Math.round((value - hours) * 60);
									return `${hours}h ${minutes}m`;
								}}
								yAxisWidth={62}
								showXAxis={false}
								showLegend={false}
							/>
						</Card>
					</>
				) : (
					<div className="flex self-center mt-32">
						{fetching ? (
							<Spinner />
						) : (
							<button
								onClick={() => loginWGauth.send("login-with-oura")}
								className="border border-white rounded-2xl p-4 text-white"
							>
                Login using Oura
							</button>
						)}
					</div>
				)}
			</div>
			{ouraToken && (
				<DataMenu
					key={`${fetchedOuraTypes}`}
					dataTypes={dataTypesToMenu}
					show={showFilesMenu}
					dataLoading={fetching}
				/>
			)}
		</div>
	);
};

export default Oura;

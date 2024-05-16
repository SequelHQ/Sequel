import { useCallback, useEffect, useMemo, useState } from "react";
import {
	getWhoopData,
	getWhoopDataTypes,
	getWhoopFetchedDay,
	getWhoopRefreshToken,
	getWhoopToken,
	storeWhoopData,
	storeWhoopDataTypes,
	storeWhoopFetchedDay,
	storeWhoopRefreshToken,
	storeWhoopToken,
} from "src/helpers/storage";
import axios from "axios";
import DataMenu from "./DataMenu";
import { AreaChart, BarChart, Card, LineChart } from "@tremor/react";
import Spinner from "src/components/spinner";
import { InnerContainer, OuterContainer } from "src/components/Containers";
import { makeInsight } from "src/helpers/utils/makeInsight";

const myWindow = window;

const Whoop = () => {
	const [fetching, setFetching] = useState<boolean>(false);
	const [whoopToken, setWhoopToken] = useState(getWhoopToken());
	const [fetchedWhoopTypes, setFetchedWhoopTypes] = useState(
		getWhoopDataTypes()
	);
	const [sleepChartData, setSleepChartData] = useState<any>();
	const [workoutChartData, setWorkoutChartData] = useState<any>();
	const [heartChartData, setHeartChartData] = useState<any>();

	let retries = 0;

	// @ts-ignore
	const { loginWGauth } = myWindow;

	const dataTypesToMenu = useMemo(() => {
		return [
			{
				label: "Sleep",
				isFetched: fetchedWhoopTypes.includes("sleep"),
			},
			{
				label: "Workout",
				isFetched: fetchedWhoopTypes.includes("workout"),
			},
			{
				label: "Recovery",
				isFetched: fetchedWhoopTypes.includes("recovery"),
			},
			{
				label: "Cycle",
				isFetched: fetchedWhoopTypes.includes("cycle"),
			},
		];
	}, []);

	useEffect(() => {
		if (loginWGauth) {
			loginWGauth.onDataFromElectronWhoop((data: any) => {
				setWhoopToken(data.access_token);
				storeWhoopToken(data.access_token);
				storeWhoopRefreshToken(data.refresh_token);
			});
		}
	}, []);

	const getFreshWhoopTokens = async () => {
		const clientId = process.env.REACT_APP_WHOOP_CLIENT_ID;
		const clientSecret = process.env.REACT_APP_WHOOP_CLIENT_SECRET;
		const refreshToken = getWhoopRefreshToken();

		if (!refreshToken) return;

		const response = await axios.post(
			"https://api.prod.whoop.com/oauth/oauth2/token",
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
			setWhoopToken(response.data.access_token);
			storeWhoopToken(response.data.refresh_token);
			storeWhoopRefreshToken(response.data.refresh_token);
		} else {
			setWhoopToken("");
			storeWhoopToken("");
			storeWhoopRefreshToken("");
		}
	};

	const getUrlFromType = (type: string) => {
		switch (type) {
		case "sleep":
			return "https://api.prod.whoop.com/developer/v1/activity/sleep";
		case "workout":
			return "https://api.prod.whoop.com/developer/v1/activity/workout";
		case "recovery":
			return "https://api.prod.whoop.com/developer/v1/recovery";
		case "cycle":
			return "https://api.prod.whoop.com/developer/v1/cycle";
		default:
			return "";
		}
	};

	const getWhoopRequest = useCallback(
		async (type: string, nextToken = "") => {
			const allData: any[] = [];
			const fetchData = async (nextToken: string) => {
				const url = getUrlFromType(type);
				try {
					const response = await axios.get(url, {
						params: {
							limit: 14,
							...(nextToken && { nextToken }),
						},
						headers: {
							Authorization: `Bearer ${whoopToken}`,
						},
					});

					if (response.status === 200) {
						const data = response.data.records ?? [];
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
								await getFreshWhoopTokens();
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
		[whoopToken]
	);

	const handleGetAllDataFromWhoop = useCallback(async () => {
		setFetching(true);
		const fetchedTypes: string[] = [];
		const fetchedData: any = {};
		await getWhoopRequest("sleep").then((data) => {
			if (!data) return;
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.sleepData = data.map((sleep: any) => ({
				start: sleep.start,
				end: sleep.end,
				is_nap: sleep.nap,
			}));
			fetchedTypes.push("sleep");
		});
		await getWhoopRequest("workout").then((data) => {
			if (!data) return;
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.workoutData = data.map((workout: any) => ({
				score: workout.score,
				start: workout.start,
				end: workout.end,
			}));
			fetchedTypes.push("workout");
		});
		await getWhoopRequest("recovery").then((data) => {
			if (!data) return;
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.recoveryData = data.map((workout: any) => ({
				score: workout.score,
			}));
			fetchedTypes.push("recovery");
		});
		await getWhoopRequest("cycle").then((data) => {
			if (!data) return;
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			fetchedData.cycleData = data.map((cycle: any) => ({
				score: cycle.score,
				start: cycle.start,
				end: cycle.end,
			}));
			fetchedTypes.push("cycle");
		});
		storeWhoopFetchedDay(new Date());
		setFetchedWhoopTypes(fetchedTypes);
		if (fetchedTypes.length) {
			storeWhoopDataTypes(fetchedTypes);
		}
		if (!!fetchedData.sleepData && !!fetchedData.workoutData) {
			storeWhoopData(JSON.stringify(fetchedData));
			makeInsight("whoop", JSON.stringify(fetchedData))
		}
		setFetching(false);
	}, [getWhoopRequest]);

	const shouldFetchData = (): boolean => {
		const lastDay = getWhoopFetchedDay();
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
		if (whoopToken && shouldFetchData()) {
			handleGetAllDataFromWhoop();
		}
		if (getWhoopData()) {
			prepareSleepChartData();
			prepareWorkoutChartData();
			prepareHeartChartData();
		}
	}, [whoopToken, handleGetAllDataFromWhoop, fetchedWhoopTypes]);

	const prepareSleepChartData = () => {
		// @ts-ignore
		const sleepData = JSON.parse(getWhoopData()).sleepData;
		const today = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(today.getDate() - 30);

		const last30DaysSleepData = sleepData.filter((sleep: any) => {
			const sleepDate = new Date(sleep.start);
			return sleepDate >= thirtyDaysAgo;
		});

		const totalSleepPerDay = last30DaysSleepData.reduce(
			(acc: any, curr: any) => {
				const day = new Date(curr.start).toISOString().split("T")[0];
				// @ts-ignore
				const sleepDuration = new Date(curr.end) - new Date(curr.start);
				acc[day] = (acc[day] || 0) + sleepDuration;
				return acc;
			},
			{}
		);

		const sleepTimePerDayInHours = Object.entries(totalSleepPerDay).map(
			([day, durationMs]: any) => ({
				date: day,
				"Hours of Sleep": durationMs / (1000 * 60 * 60),
			})
		);

		const chartdata = sleepTimePerDayInHours.map((day) => ({
			name: day.date,
			"Hours of Sleep": parseFloat(day["Hours of Sleep"].toFixed(2)),
		}));
		setSleepChartData(chartdata);
	};

	const prepareWorkoutChartData = () => {
		// @ts-ignore
		const workoutData = JSON.parse(getWhoopData()).workoutData;
		const today = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(today.getDate() - 30);

		const last30DaysWorkout = workoutData.filter((sleep: any) => {
			const sleepDate = new Date(sleep.start);
			return sleepDate >= thirtyDaysAgo;
		});

		const totalWorkoutPerDay = last30DaysWorkout.reduce(
			(acc: any, curr: any) => {
				const day = new Date(curr.start).toISOString().split("T")[0];
				// @ts-ignore
				const workoutDuration = new Date(curr.end) - new Date(curr.start);
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
		setWorkoutChartData(chartdata);
	};

	const prepareHeartChartData = () => {
		// @ts-ignore
		const workoutData = JSON.parse(getWhoopData()).workoutData;

		const today = new Date();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(today.getDate() - 30);

		const last30DaysWorkoutData = workoutData.filter((workout: any) => {
			const workoutDate = new Date(workout.start);
			return workoutDate >= thirtyDaysAgo;
		});

		const heartRateData = last30DaysWorkoutData.reduce(
			(acc: any, curr: any) => {
				const day = new Date(curr.start).toISOString().split("T")[0];
				if (!acc[day]) {
					acc[day] = {
						totalHeartRate: curr.score.average_heart_rate,
						count: 1,
					};
				} else {
					acc[day].totalHeartRate += curr.score.average_heart_rate;
					acc[day].count += 1;
				}
				return acc;
			},
			{}
		);

		const dailyAverageHeartRate = Object.entries(heartRateData).map(
			([day, data]: any) => ({
				date: day,
				averageHeartRate: data.totalHeartRate / data.count,
			})
		);

		const chartdata = dailyAverageHeartRate.map((day) => ({
			name: day.date,
			"Average Heart Rate": Math.round(day.averageHeartRate),
		}));

		setHeartChartData(chartdata);
	};

	return (
		<OuterContainer>
			<InnerContainer>
				{whoopToken && (
					<button
						onClick={() => {
							setWhoopToken("");
							storeWhoopToken("");
							storeWhoopRefreshToken("");
							storeWhoopDataTypes([]);
							storeWhoopFetchedDay("" as unknown as Date);
							storeWhoopData("");
						}}
						className="border border-white rounded-2xl mr-4 p-2 text-white z-10 self-end mb-4"
					>
            Logout
					</button>
				)}
				{getWhoopData() ? (
					<>
						<Card>
							<div className="font-bold text-xl text-white mb-2">
                Sleep duration
							</div>
							<div className="text-base font-thin text-white mb-8">
                Last 30 days
							</div>
							<LineChart
								className="h-40"
								data={sleepChartData}
								index="name"
								categories={["Hours of Sleep"]}
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
						<Card className="mt-8">
							<div className="font-bold text-xl text-white mb-2">
                Workout duration
							</div>
							<div className="text-base font-thin text-white mb-8">
                Last 30 days
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
						<Card className="mt-8">
							<div className="font-bold text-xl text-white mb-2">
                Heart rate
							</div>
							<div className="text-base font-thin text-white mb-8">
                During workouts in the last 30 days
							</div>
							<AreaChart
								className="h-40"
								data={heartChartData}
								index="name"
								categories={["Average Heart Rate"]}
								colors={["blue"]}
								valueFormatter={(value) => `${value} bpm`}
								yAxisWidth={68}
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
								onClick={() => loginWGauth.send("login-with-whoop")}
								className="border border-white rounded-2xl p-4 text-white"
							>
                Login using Whoop
							</button>
						)}
					</div>
				)}
			</InnerContainer>

			{whoopToken && (
				<DataMenu
					key={`${fetchedWhoopTypes}`}
					dataTypes={dataTypesToMenu}
					show={true}
					dataLoading={fetching}
				/>
			)}
		</OuterContainer>
	);
};

export default Whoop;

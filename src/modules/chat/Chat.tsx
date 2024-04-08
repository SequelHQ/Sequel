import { useEffect, useRef, useState } from "react";
import Loader from "src/components/chat/Loader";
import MessageItem from "src/components/chat/MessageItem";
import { MessageType } from "src/helpers/types/message.types";
import { TrashIcon, CrumpledPaperIcon } from "@radix-ui/react-icons";
import {
	getChatMessagesData,
	getFiles,
	getJournalData,
	getWhoopData,
	storeChatMessagesData,
} from "src/helpers/storage";
import ReplyBoxNoDocs from "src/components/chat/ReplyBoxNoDocs";
import {
	ChatEmitter,
	getAnswer,
	removeExistingThread,
} from "../whoop/LLMLogic";
import { TestType } from "../tests/testsList";
import { TherapyItem } from "../therapies/therapiesList";
import { SupplementType } from "../supplements/supplementsList";
import { ModuleContainer } from "src/components/Containers";

const MESSAGES = [
	{
		message: "Hey there, lets get started!",
		isSent: false,
	},
];

function convertWhoopDataToArrayLikeObject(whoopData: any) {
	/*
   * Convert the whoop data to an array like object. It will be a jsonifed string, first we parse it
   * then we convert it to an array like object
   * Where .sleep looks like {\"start\":\"2024-01-28T07:57:56.432Z\",\"end\":\"2024-01-28T16:01:00.082Z\",\"is_nap\":false},{\"start\":\"2024-01-27T08:27:13.505Z\",\"end\":\"2024-01-27T14:53:43.416Z\",\"is_nap\":false},{\"start\":\"2024-01-
   * We convert it to {'start': ['2024-01-28T07:57:56.432Z', '2024-01-27T08:27:13.505Z'], 'end': ['2024-01-28T16:01:00.082Z', '2024-01-27T14:53:43.416Z'], 'is_nap': [false, false]}
   *
   * Where .workoutData looks like "workoutData\":[{\"score\":{\"strain\":6.1666,\"average_heart_rate\":125,\"max_heart_rate\":152,\"kilojoule\":757.8429,\"percent_recorded\":100,\"distance_meter\":0,\"altitude_gain_meter\":0,\"altitude_change_meter\":0,\"zone_duration\":{\"zone_zero_milli\":20188,\"zone_one_milli\":194182,\"zone_two_milli\":756590,\"zone_three_milli\":988222,\"zone_four_milli\":20187,\"zone_five_milli\":0}},\"start\":\"2024-03-08T23:58:30.121Z\",\"end\":\"2024-03-09T00:31:29.452Z\"},{\"score\":{\"strain\":5.5487,\"average_heart_rate\":113,\"max_heart_rate\":148,\"kilojoule\":680.6195,\"percent_recorded\":100,\"distance_meter\":0,\"altitude_gain_meter\":0,\"altitude_change_meter\":0,\"zone_duration\":{\"zone_zero_milli\":149005,\"zone_one_milli\":725788,\"zone_two_milli\":1892846,\"zone_three_milli\":381641,\"zone_four_milli\":0,\"zone_five_milli\":0}},\"start\":\"2024-03-08T19:00:00.186Z\",\"end\":\"2024-03-
   * We convert it to {'score': {'strain': [6.1666, 5.5487], 'average_heart_rate': [125, 113], 'max_heart_rate': [152, 148], 'kilojoule': [757.8429, 680.6195], 'percent_recorded': [100, 100], 'distance_meter': [0, 0], 'altitude_gain_meter': [0, 0], 'altitude_change_meter': [0, 0], 'zone_duration': {'zone_zero_milli': [20188, 149005], 'zone_one_milli': [194182, 725788], 'zone_two_milli': [756590, 1892846], 'zone_three_milli': [988222, 381641], 'zone_four_milli': [20187, 0], 'zone_five_milli': [0, 0]}, 'start': ['2024-03-08T23:58:30.121Z', '2024-03-08T19:00:00.186Z'], 'end': ['2024-03-09T00:31:29.452Z', '2024-03-08T23:58:30.121Z']}
   *
   * Where .recoveryData loops like "recoveryData\":[{\"score\":{\"user_calibrating\":false,\"recovery_score\":33,\"resting_heart_rate\":79,\"hrv_rmssd_milli\":17.92177,\"spo2_percentage\":94.46154,\"skin_temp_celsius\":33.8}},{\"score\":{\"user_calibrating\":false,\"recovery_score\":35,\"resting_heart_rate\":80,\"hrv_rmssd_milli\":16.95561,\"spo2_percentage\":93.47369,\"skin_temp_celsius\":34.1}},{\"score\":{\"user_calibrating\":false,\"recovery_s
   * We convert it to {'score': {'user_calibrating': [false, false, false], 'recovery_score': [33, 35, 36], 'resting_heart_rate': [79, 80, 81], 'hrv_rmssd_milli': [17.92177, 16.95561, 15.98945], 'spo2_percentage': [94.46154, 93.47369, 92.48584], 'skin_temp_celsius': [33.8, 34.1, 34.2]}
   *
   */
	if (!whoopData) return;

	const whoopDataObject = JSON.parse(whoopData);
	const whoopSleep = whoopDataObject.sleepData;
	const whoopWorkoutData = whoopDataObject.workoutData;
	const whoopRecoveryData = whoopDataObject.recoveryData;
	const sleep = { start: [], end: [], is_nap: [] };
	const workoutData = {
		score: {
			strain: [],
			average_heart_rate: [],
			max_heart_rate: [],
			kilojoule: [],
			percent_recorded: [],
			distance_meter: [],
			altitude_gain_meter: [],
			altitude_change_meter: [],
			zone_duration: {
				zone_zero_milli: [],
				zone_one_milli: [],
				zone_two_milli: [],
				zone_three_milli: [],
				zone_four_milli: [],
				zone_five_milli: [],
			},
			start: [],
			end: [],
		},
	};
	const recoveryData = {
		score: {
			user_calibrating: [],
			recovery_score: [],
			resting_heart_rate: [],
			hrv_rmssd_milli: [],
			spo2_percentage: [],
			skin_temp_celsius: [],
		},
	};

	whoopSleep.forEach((item: any) => {
		for (const key in sleep) {
			// @ts-ignore
			sleep[key].push(item[key]);
		}
	});
	whoopWorkoutData.forEach((item: any) => {
		for (const key in workoutData.score) {
			if (key === "zone_duration") {
				for (const zoneKey in workoutData.score.zone_duration) {
					// @ts-ignore
					workoutData.score.zone_duration[zoneKey].push(
						item.score.zone_duration[zoneKey]
					);
				}
			} else if (key === "start" || key === "end") {
				// @ts-ignore
				workoutData.score[key].push(item[key]);
			} else {
				// @ts-ignore
				workoutData.score[key].push(item.score[key]);
			}
		}
	});

	whoopRecoveryData.forEach((item: any) => {
		for (const key in recoveryData.score) {
			// @ts-ignore
			recoveryData.score[key].push(item.score[key]);
		}
	});
	return { sleep, workoutData, recoveryData };
}

const Chat = () => {
	const [messages, setMessages] = useState<MessageType[]>(
		getChatMessagesData().length ? getChatMessagesData() : [...MESSAGES]
	);
	const [messageText, setMessageText] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const messagesEndRef = useRef<any>(null);
	const [showFilesMenu] = useState<boolean>(true);
	const [loadingMessage, setLoadingMessage] = useState<string>("");
	const [isClearingConversation, setIsClearingConversation] =
    useState<boolean>(false);
	const [streamedMessage, setStreamedMessage] = useState("");

	useEffect(() => {
		ChatEmitter.on("updateMessage", (message: any) => {
			setStreamedMessage((p) => (p += message.detail));
		});
		ChatEmitter.on("finishedMessage", () => {
			setStreamedMessage("");
		});
		return () => {
			ChatEmitter.removeEventListener("updateMessage", (message: any) => {
				setStreamedMessage((p) => (p += message.detail));
			});
			ChatEmitter.removeEventListener("finishedMessage", () => {
				setStreamedMessage("");
			});
		};
	}, []);

	const handleClear = () => {
		setIsClearingConversation(true);
		setMessages([...MESSAGES]);
		storeChatMessagesData([...MESSAGES]);
		removeExistingThread();
		setIsClearingConversation(false);
	};

	const handleSendMessage = (message: string) => {
		setMessages([...messages, { message, isSent: true }]);
		storeChatMessagesData([...messages, { message, isSent: true }]);
		handleGetAnswer(message);
	};

	const handleGetAnswer = async (message: string) => {
		setLoading(true);
		setLoadingMessage("Generating response...");
		let whoopData = {};
		try {
			// @ts-ignore
			whoopData = convertWhoopDataToArrayLikeObject(getWhoopData());
		} catch (e) {
			console.error(e);
		}
		const allData = JSON.stringify({
			files: getFiles(),
			therapies: JSON.parse(localStorage.getItem("therapiesList") ?? "")?.map(
				(therapy: TherapyItem) => {
					return `${therapy.label} - In progress: ${therapy.inProgress}`;
				}
			),
			tests: JSON.parse(localStorage.getItem("testsList") ?? "")?.map(
				(test: TestType) => {
					return `${test.test_name} - Ordered: ${test.ordered} - Taken ${test.taken}`;
				}
			),
			supplements: JSON.parse(
				localStorage.getItem("supplementsList") ?? ""
			)?.map((supplement: SupplementType) => {
				return `${supplement.supplement} - ID: ${supplement.id} - Ordered: ${supplement.ordered} - Dosage ${supplement.dosage}`;
			}),
			journal: getJournalData(),
			whoop: whoopData,
		});
		try {
			const result = await getAnswer(message, allData);
			setMessages((p) => [
				...p,
				{ message: result.message, isSent: result.isSent },
			]);
			storeChatMessagesData([
				...messages,
				{ message, isSent: true },
				{ message: result.message, isSent: result.isSent },
			]);
		} catch (e) {
			setMessages((p) => [
				...p,
				{
					message: "Sorry, I couldn't process your request. Please try again.",
					isSent: false,
				},
			]);
			storeChatMessagesData([
				...messages,
				{
					message: "Sorry, I couldn't process your request. Please try again.",
					isSent: false,
				},
			]);
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ModuleContainer>
			<div
				className={`flex flex-col w-full flex-1 overflow-auto ${
					showFilesMenu ? "pr-2" : "pr-6"
				} mb-6 relative`}
				style={{
					height: 20,
				}}
			>
				<div className="sticky top-0 right-0 text-white text-right flex justify-end">
					{isClearingConversation ? (
						<CrumpledPaperIcon className="w-8 h-8 cursor-pointer animate-spin" />
					) : (
						<TrashIcon
							className="w-8 h-8 cursor-pointer z-10"
							onClick={handleClear}
						/>
					)}
				</div>

				{messages.map((item, index) => (
					<MessageItem message={item} key={index} />
				))}
				{loading && !streamedMessage ? (
					<div className="flex px-4 mt-4">
						<Loader loadingMessage={loadingMessage} />
					</div>
				) : null}
				{loading && streamedMessage ? (
					<MessageItem message={{ message: streamedMessage, isSent: false }} />
				) : null}
				<div ref={messagesEndRef} />
			</div>
			<ReplyBoxNoDocs
				onSend={handleSendMessage}
				messageText={messageText}
				setMessageText={setMessageText}
				isLoading={loading}
				disabled={loading}
				openSidePanel={() => null}
			/>
		</ModuleContainer>
	);
};

export default Chat;

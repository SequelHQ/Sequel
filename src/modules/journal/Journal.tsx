import { debounce } from "lodash";
import { MicIcon, PauseIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { getJournalData, storeJournalData } from "src/helpers/storage";
import MicRecorder from "mic-recorder-to-mp3";
import Spinner from "src/components/spinner";
import { transcribeAudio } from "src/helpers/transcribe";

const recorder = new MicRecorder({
	bitRate: 128,
});

const Journal = () => {
	const [value, setValue] = useState(getJournalData() ?? "");
	const [isRecording, setIsRecording] = useState(false);
	const [isSummarizing, setIsSummarizing] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const uploadToApi = useCallback(
		async (file: any) => {
			setIsSummarizing(true);
			try {
				const response = await transcribeAudio(file);
				if (response && textAreaRef.current) {
					const isFocused = document.activeElement === textAreaRef.current;
					let updatedValue = value;
					if (isFocused) {
						const { selectionStart, selectionEnd } = textAreaRef.current;
						updatedValue =
              value.substring(0, selectionStart) +
              "\n" +
              response +
              "\n\n" +
              value.substring(selectionEnd, value.length);
						textAreaRef.current.selectionStart = selectionStart + 1;
						textAreaRef.current.selectionEnd =
              selectionStart + 1 + response.length;
					} else {
						updatedValue += "\n" + response;
					}
					setValue(updatedValue);
					storeJournalData(updatedValue);
				}
			} catch (e) {
				console.error(e, "Error transcribing");
			} finally {
				setIsSummarizing(false);
			}
		},
		[value]
	);

	const onStartRecord = async () => {
		const audio = new Audio("/audios/start.mp3");
		audio.play();
		recorder
			.start()
			.then(() => {
				setIsRecording(true);
			})
			.catch((e: any) => {
				console.error(e);
				setIsRecording(false);
			});
	};

	const onStopRecord = useCallback(async () => {
		const audio = new Audio("/audios/start.mp3");
		audio.play();
		setIsSummarizing(true);
		recorder
			.stop()
			.getMp3()
			.then(([buffer, blob]: any) => {
				const file = new File(buffer, "new-recording.mp3", {
					type: blob.type,
				});
				uploadToApi(file);
			});
	}, [uploadToApi]);

	const onRecord = useCallback(
		(event: any) => {
			event.preventDefault();
			if (isRecording) {
				onStopRecord();
				setIsRecording(false);
			} else if (!isRecording) {
				onStartRecord();
				setIsRecording(true);
			}
			setTimeout(() => {
				textAreaRef.current?.focus();
			}, 100);
		},
		[isRecording, onStopRecord]
	);

	const saveInput = useCallback(
		debounce((nextValue) => {
			storeJournalData(nextValue);
		}, 1000),
		[]
	);

	const handleChange = (event: any) => {
		const nextValue = event.target.value;
		setValue(nextValue);
		saveInput(nextValue);
	};
	return (
		<div className="ml-4 bg-[#161617] rounded-3xl h-[calc(100vh-64px)] flex flex-1 flex-col items-start px-12 py-8 overflow-x-hidden">
			<div className="font-bold text-2xl text-white mb-2 pt-4 pb-4">
        Journal
			</div>
			<div className="relative w-full h-full">
				<textarea
					ref={textAreaRef}
					value={value}
					onChange={handleChange}
					className="h-full w-full text-white text-base font-light bg-[#161617] rounded-xl border-white border p-4 resize-none outline-none"
					placeholder="Start typing..."
				/>
				{isSummarizing ? (
					<Spinner className="absolute right-4 bottom-4 h-6 w-6 text-white" />
				) : !isRecording ? (
					<MicIcon
						className="cursor-pointer absolute right-4 bottom-4 h-6 w-6 text-white"
						onClick={onRecord}
					/>
				) : (
					<PauseIcon
						className="cursor-pointer absolute right-4 bottom-4 h-6 w-6 text-white"
						onClick={onRecord}
					/>
				)}
			</div>
		</div>
	);
};

export default Journal;

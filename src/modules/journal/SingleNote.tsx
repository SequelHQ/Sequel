import { MicIcon, PauseIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import Spinner from "src/components/spinner";
import { transcribeAudio } from "src/helpers/transcribe";

const recorder = new MicRecorder({
	bitRate: 128,
});

const SingleNote = ({ value, setValue, index, placeholder }: { value: string; setValue: (value: string, index: number) => void; index: number; placeholder?: string }) => {
	
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
					setValue(updatedValue, index);
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

	// eslint-disable-next-line
	// const saveInput = useCallback(
	// 	debounce((nextValue) => {
	// 		// storeJournalData(nextValue);
	// 	}, 1000),
	// 	[]
	// );

	const handleChange = (event: any) => {
		const nextValue = event.target.value;
		setValue(nextValue, index);
		// saveInput(nextValue);
	};
	return (
		<div >

			<div className="relative w-full h-[200px]">
				<textarea
					ref={textAreaRef}
					value={value}
					onChange={handleChange}
					className="h-full w-full text-white text-base font-light bg-[#161617] rounded-xl border-white border p-4 resize-none outline-none"
					placeholder={placeholder || "Start typing..."}
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

export default SingleNote;

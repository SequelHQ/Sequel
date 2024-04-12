import OpenAI from "openai";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

export const transcribeAudio = async (file: any) => {
	try {
		const response = await openai.audio.transcriptions.create({
			model: "whisper-1",
			file: file,
		});

		if (response?.text) {
			return response?.text;
		} else {
			console.error("Failed to transcribe audio.");
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

import { MessageType } from "./types/message.types";
import { FileType } from "./types/file.types";
import { ORGANS_DATA, OrgansDataType } from "src/modules/organs/OrgansObj";

const storeFiles = (files: FileType[]) => {
	return localStorage.setItem("files", JSON.stringify(files));
};
  
const getFiles = (): FileType[] => {
	try {
		const files = localStorage.getItem("files");
		return files ? JSON.parse(files) : [];
	} catch (e) {
		console.log(e);
		return [];
	}
};

const storeWhoopData = (whoopData: string) => {
	return localStorage.setItem("whoopData", JSON.stringify(whoopData));
};

const getWhoopData = (): string => {
	try {
		const data = localStorage.getItem("whoopData");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeWhoopFetchedDay = (date: Date) => {
	return localStorage.setItem("whoopFetchedDate", JSON.stringify(date));
};

const getWhoopFetchedDay = (): string => {
	try {
		const data = localStorage.getItem("whoopFetchedDate");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeWhoopMessagesData = (whoopMessages: MessageType[]) => {
	return localStorage.setItem("whoopMessages", JSON.stringify(whoopMessages));
};

const getWhoopMessagesData = (): MessageType[] => {
	try {
		const data = localStorage.getItem("whoopMessages");
		return data ? JSON.parse(data) : [];
	} catch (e) {
		console.log(e);
		return [];
	}
};

const storeChatMessagesData = (chatMessages: MessageType[]) => {
	return localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
};

const getChatMessagesData = (): MessageType[] => {
	try {
		const data = localStorage.getItem("chatMessages");
		return data ? JSON.parse(data) : [];
	} catch (e) {
		console.log(e);
		return [];
	}
};

const storeWhoopDataTypes = (whoopDataType: string[]) => {
	return localStorage.setItem("whoopDataTypes", JSON.stringify(whoopDataType));
};

const getWhoopDataTypes = (): string[] => {
	try {
		const data = localStorage.getItem("whoopDataTypes");
		return data ? JSON.parse(data) : [];
	} catch (e) {
		console.log(e);
		return [];
	}
};

const storeWhoopToken = (whoopData: string) => {
	return localStorage.setItem("whoopToken", JSON.stringify(whoopData));
};

const getWhoopToken = (): string => {
	try {
		const data = localStorage.getItem("whoopToken");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeWhoopRefreshToken = (token: string) => {
	return localStorage.setItem("whoopRefreshToken", JSON.stringify(token));
};

const getWhoopRefreshToken = (): string => {
	try {
		const data = localStorage.getItem("whoopRefreshToken");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};


const storeOuraData = (whoopData: string) => {
	return localStorage.setItem("ouraData", JSON.stringify(whoopData));
};

const getOuraData = (): string => {
	try {
		const data = localStorage.getItem("ouraData");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeOuraFetchedDay = (date: Date) => {
	return localStorage.setItem("ouraFetchedDate", JSON.stringify(date));
};

const getOuraFetchedDay = (): string => {
	try {
		const data = localStorage.getItem("ouraFetchedDate");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeOuraDataTypes = (whoopDataType: string[]) => {
	return localStorage.setItem("ouraDataTypes", JSON.stringify(whoopDataType));
};

const getOuraDataTypes = (): string[] => {
	try {
		const data = localStorage.getItem("ouraDataTypes");
		return data ? JSON.parse(data) : [];
	} catch (e) {
		console.log(e);
		return [];
	}
};

const storeOuraToken = (whoopData: string) => {
	return localStorage.setItem("ouraToken", JSON.stringify(whoopData));
};

const getOuraToken = (): string => {
	try {
		const data = localStorage.getItem("ouraToken");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeOuraRefreshToken = (token: string) => {
	return localStorage.setItem("ouraRefreshToken", JSON.stringify(token));
};

const getOuraRefreshToken = (): string => {
	try {
		const data = localStorage.getItem("ouraRefreshToken");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeJournalData = (journalData: string) => {
	return localStorage.setItem("journalData", JSON.stringify(journalData));
};

const getJournalData = (): string => {
	try {
		const data = localStorage.getItem("journalData");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

export const storeOrgans = (organs: OrgansDataType) => {
	return localStorage.setItem("organs", JSON.stringify(organs));
};

export const getOrgans = (): OrgansDataType => {
	try {
		const organs = localStorage.getItem("organs");
		if (organs && organs !== "undefined") {
			return JSON.parse(organs);
		} else {
			return ORGANS_DATA;
		}
	} catch (e) {
		console.log(e);
		return ORGANS_DATA;
	}
};

const storeAppAssistant = (assistant: object) => {
	return localStorage.setItem("Assistant", JSON.stringify(assistant));
};

const getAppAssistant = (): object => {
	try {
		const data = localStorage.getItem("Assistant");
		return data ? JSON.parse(data) : {};
	} catch (e) {
		console.log(e);
		return {};
	}
};

const storeThreadId = (threadId: string) => {
	return localStorage.setItem("ThreadId", JSON.stringify(threadId));
};

const getThreadId = (): string => {
	try {
		const data = localStorage.getItem("ThreadId");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const storeAssistantId = (threadId: string) => {
	return localStorage.setItem("AssistantId", JSON.stringify(threadId));
};

const getAssistantId = (): string => {
	try {
		const data = localStorage.getItem("AssistantId");
		return data ? JSON.parse(data) : "";
	} catch (e) {
		console.log(e);
		return "";
	}
};

const getSelectedAIConfiguration = (): string => {
	const selectedAIConfiguration = localStorage.getItem(
		"selectedAIConfiguration"
	);
	return selectedAIConfiguration ?? "";
};

const getAIKey = (): string => localStorage.getItem("AIKey") ?? "";

export {
	storeFiles,
	getFiles,
	storeWhoopData,
	getWhoopData,
	storeWhoopToken,
	getWhoopToken,
	getWhoopDataTypes,
	storeWhoopDataTypes,
	storeOuraData,
	getOuraData,
	storeOuraDataTypes,
	getOuraDataTypes,
	storeOuraFetchedDay,
	getOuraFetchedDay,
	storeOuraRefreshToken,
	getOuraRefreshToken,
	storeOuraToken,
	getOuraToken,
	getAppAssistant,
	storeAppAssistant,
	storeThreadId,
	getThreadId,
	storeAssistantId,
	getAssistantId,
	getSelectedAIConfiguration,
	getAIKey,
	storeWhoopRefreshToken,
	getWhoopRefreshToken,
	storeJournalData,
	getJournalData,
	storeWhoopMessagesData,
	getWhoopMessagesData,
	storeChatMessagesData,
	getChatMessagesData,
	storeWhoopFetchedDay,
	getWhoopFetchedDay,
};

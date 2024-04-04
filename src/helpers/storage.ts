import { MessageType } from "./types/message.types";

const storeFiles = (
  files: {
    name: string;
    content: string;
    createdDate: number;
  }[]
) => {
  return localStorage.setItem("files", JSON.stringify(files));
};

const getFiles = (): {
  name: string;
  content: string;
  createdDate: number;
}[] => {
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

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer, shell } = require("electron");
window.ipcRenderer = ipcRenderer;

contextBridge.exposeInMainWorld("loginWGauth", {
	send: (channel, data) => {
		ipcRenderer.send(channel, data);
	},
	onDataFromElectron: (callback) => {
		ipcRenderer.on("data-from-electron", (event, data) => {
			callback(data);
		});
	},
	minimizeApp: () => {
		ipcRenderer.send("minimize");
	},
	maximizeApp: () => {
		ipcRenderer.send("maximize");
	},
	closeApp: () => {
		ipcRenderer.send("close");
	},
	openExternal: (url) => {
		shell.openExternal(url);
	},
});

const electronHandler = {
	ipcRenderer: {
		sendMessage(channel, ...args) {
			ipcRenderer.send(channel, ...args);
		},
		on(channel, func) {
			const subscription = (_event, ...args) => func(...args);
			ipcRenderer.on(channel, subscription);

			return () => {
				ipcRenderer.removeListener(channel, subscription);
			};
		},
		once(channel, func) {
			ipcRenderer.once(channel, (_event, ...args) => func(...args));
		},
	},
};

contextBridge.exposeInMainWorld("electron", electronHandler);

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("versions", process.versions);
});

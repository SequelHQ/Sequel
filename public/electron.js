// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, ipcMain, Menu } = require("electron");
const path = require("path");
const axios = require("axios");
require("dotenv").config();


let mainWindow;

// Create the native browser window.
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 1200,
		minWidth: 900,
		minHeight: 600,
		transparent: true,
		frame: false,
		shape: "roundedRect",
		vibrancy: "fullscreen-ui",
		resizable: true,
		webPreferences: {
			preload: __dirname + "/preload.js",
			nodeIntegration: true,
			nativeWindowOpen: true,
			webSecurity: false,
			devTools: true,
			webviewTag: true,
		},
		icon: path.join(__dirname, "public/favicon.png"),
	});

	mainWindow.loadURL(
		!app.isPackaged
			? "http://localhost:3000"
			: `file://${__dirname}/../build/index.html`
	);

	mainWindow.webContents.on("new-window", function (e, url) {
		e.preventDefault();
		require("electron").shell.openExternal(url);
	});

	ipcMain.on("getEnv", (event, arg) => {
		event.reply("envReply", process.env);
	});

	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools();
	}
	if (app.isPackaged) {
		const menu = Menu.getApplicationMenu(); // get default menu

		const newmenu = Menu.buildFromTemplate(
			menu.items.map((i) => {
				if (i.role === "viewmenu") {
					const newviewsub = Menu.buildFromTemplate(
						i.submenu.items.filter((i, index) => index !== 2) // cut first 4 item (4th is separator)
					);
					return Object.assign({}, i, { submenu: newviewsub });
				}
				return i;
			})
		);
		Menu.setApplicationMenu(newmenu);
	}

	mainWindow.setBackgroundColor("#80000000");
}

function setupLocalFilesNormalizerProxy() {
	protocol.registerHttpProtocol(
		"file",
		(request, callback) => {
			const url = request.url.substr(8);
			callback({ path: path.normalize(`${__dirname}/${url}`) });
		},
		(error) => {
			if (error) console.error("Failed to register protocol");
		}
	);
}

app.whenReady().then(() => {
	if (process.defaultApp) {
		if (process.argv.length >= 2) {
			app.setAsDefaultProtocolClient("sequel", process.execPath, [
				path.resolve(process.argv[1]),
			]);
		}
	} else {
		app.setAsDefaultProtocolClient("sequel");
	}

	createWindow();
	setupLocalFilesNormalizerProxy();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

async function authenticateWithWhoop() {
	const clientId = process.env.REACT_APP_WHOOP_CLIENT_ID;
	const redirectUri = "sequel://app-view?module=whoop";
	const responseType = "code";

	const scopes = [
		"read:recovery",
		"read:cycles",
		"read:workout",
		"read:sleep",
		"read:profile",
		"read:body_measurement",
		"offline",
	];

	const scope = scopes.join(" ");

	const whoopAuthUrl = `https://api.prod.whoop.com/oauth/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&state=whoop-configuration&scope=${encodeURIComponent(
		scope
	)}`;

	let authWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
		},
	});

	authWindow.loadURL(whoopAuthUrl);
	authWindow.show();

	function handleCallback(url) {
		const raw_code = /code=([^&]*)/.exec(url) || null;
		const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
		const error = /\?error=(.+)$/.exec(url);

		if (code || error) {
			authWindow.destroy();
		}

		if (code) {
			exchangeCodeForTokenWhoop(code);
		} else if (error) {
			console.error(`OAuth callback error: ${error}`);
		}
	}

	authWindow.webContents.on("will-redirect", (event, url) => {
		handleCallback(url);
	});

	// For older versions of Electron, use 'will-navigate' event
	authWindow.webContents.on("will-navigate", (event, url) => {
		handleCallback(url);
	});

	// Clean up the window
	authWindow.on("closed", () => {
		//@ts-ignore
		authWindow = null;
	});
}

async function exchangeCodeForTokenWhoop(code) {
	const clientId = process.env.REACT_APP_WHOOP_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_WHOOP_CLIENT_SECRET;
	const redirectUri = "sequel://app-view?module=whoop";

	try {
		const response = await axios.post(
			"https://api.prod.whoop.com/oauth/oauth2/token",
			{
				client_id: clientId,
				client_secret: clientSecret,
				code: code,
				redirect_uri: redirectUri,
				grant_type: "authorization_code",
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		mainWindow.webContents.send("data-from-electron", response.data);
	} catch (error) {
		console.error("Error exchanging code for token:", error);
	}
}


async function authenticateWithOura() {
	const clientId = process.env.REACT_APP_OURA_CLIENT_ID;
	const redirectUri = "sequel://app-view?module=oura";
	const responseType = "code";
  
	const whoopAuthUrl = `https://cloud.ouraring.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&state=oura-configuration`;
  
	let authWindow = new BrowserWindow({
	  width: 800,
	  height: 600,
	  webPreferences: {
		nodeIntegration: false,
	  },
	});
  
	authWindow.loadURL(whoopAuthUrl);
	authWindow.show();
  
	function handleCallback(url) {
	  const raw_code = /code=([^&]*)/.exec(url) || null;
	  const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
	  const error = /\?error=(.+)$/.exec(url);
  
	  if (code || error) {
		authWindow.destroy();
	  }
  
	  if (code) {
		exchangeCodeForTokenOura(code);
	  } else if (error) {
		console.error(`OAuth callback error: ${error}`);
	  }
	}
  
	authWindow.webContents.on("will-redirect", (event, url) => {
	  handleCallback(url);
	});
  
	// For older versions of Electron, use 'will-navigate' event
	authWindow.webContents.on("will-navigate", (event, url) => {
	  handleCallback(url);
	});
  
	// Clean up the window
	authWindow.on("closed", () => {
	  //@ts-ignore
	  authWindow = null;
	});
  }
  
  async function exchangeCodeForTokenOura(code) {
	const clientId = process.env.REACT_APP_OURA_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_OURA_CLIENT_SECRET;
	const redirectUri = "sequel://app-view?module=oura";
  
	try {
	  const response = await axios.post(
		"https://api.ouraring.com/oauth/token",
		{
		  client_id: clientId,
		  client_secret: clientSecret,
		  code: code,
		  redirect_uri: redirectUri,
		  grant_type: "authorization_code",
		},
		{
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		  },
		}
	  );
  
	  mainWindow.webContents.send("data-from-electron-oura", response.data);
	} catch (error) {
	  console.error("Error exchanging code for token:", error);
	}
  }

  
ipcMain.on("login-with-whoop", (event, data) => {
	authenticateWithWhoop();
});

ipcMain.on("login-with-oura", (event, data) => {
	authenticateWithOura();
});

ipcMain.on("close", () => {
	mainWindow.close();
});

ipcMain.on("minimize", () => {
	mainWindow.minimize();
});

ipcMain.on("maximize", () => {
	if (mainWindow.isMaximized()) mainWindow.unmaximize();
	else mainWindow.maximize();
});

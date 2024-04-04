const fs = require("fs");
console.log("\n\n\nPre build script running...");
let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
let versionNumber = packageJson.version;
console.log("Version Number: ", versionNumber);
let sidebarFile = fs.readFileSync("src/components/sidebar/Sidebar.tsx", "utf8");
let updatedSidebarFile = sidebarFile.replace(/<span id="version_number">.*<\/span>/g, `<span id="version_number">v${versionNumber}</span>`);
fs.writeFileSync("src/components/sidebar/Sidebar.tsx", updatedSidebarFile);

console.log("Pre build script finished\n\n\n");
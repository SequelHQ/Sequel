// node publish/pre-build.js && react-scripts build && electron-forge publish && node publish/update-releases.js && node publish/release.js

const fs = require("fs");
const { execSync } = require("child_process");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

console.log("\nRunning general pre-build script...");
console.log("\nPre build script running...");
let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
let versionNumber = packageJson.version;
console.log("Version Number: ", versionNumber);
let sidebarFile = fs.readFileSync("src/components/sidebar/Sidebar.tsx", "utf8");
let updatedSidebarFile = sidebarFile.replace(
	/<span id="version_number">.*<\/span>/g,
	`<span id="version_number">v${versionNumber}</span>`
);
fs.writeFileSync("src/components/sidebar/Sidebar.tsx", updatedSidebarFile);
console.log("Pre build script finished\n");

// BUILD FOR ARM64
console.log("\nBuilding React...");
const build = execSync("react-scripts build");
console.log("Build finished\n");

// DMG
console.log("\n\n[x64] Full ...");
// const build_x64 = execSync("electron-forge publish --arch=x64");
console.log("[x64] Full finished\n");

// BUILD FOR ARM64
console.log("\n[arm64] Full...");
const build_arm64 = execSync("electron-forge publish");
console.log("[arm64] Full finished\n");


// UPDATE RELEASES.JSON FOR ARM64
function updateAndPublishReleases(architecture) {
	console.log(`\nUpdating RELEASES.json for ${architecture}...`);
	const releasesJsonPath = `RELEASES_${architecture.toUpperCase()}.json`;
	const releasesJson = JSON.parse(fs.readFileSync(releasesJsonPath, "utf8"));
	releasesJson.currentRelease = packageJson.version;
	releasesJson.releases.push({
		version: packageJson.version,
		updateTo: {
			version: packageJson.version,
			pub_date: new Date().toISOString(),
			notes: "Theses are some release notes innit",
			name: packageJson.version,
			url: ``,
		},
	});
	fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
	console.log(`\nPublishing RELEASES.json for ${architecture}...`);
	AWS.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: "us-west-1",
	});
	const s3 = new AWS.S3();
	const params = {
		Bucket: "builds",
		Key: `sequel/darwin/${architecture}/RELEASES.json`,
		Body: fs.createReadStream(releasesJsonPath),
		ACL: "public-read",
	};

	s3.upload(params, function (err, data) {
		if (err) {
			console.log("Error uploading data: ", err);
		} else {
			console.log(
				`Successfully uploaded RELEASES.json for ${architecture} to bucket`
			);
		}
	});
}

updateAndPublishReleases("arm64");
// updateAndPublishReleases("x64");

console.log("\n\n\nBuild finished\n\n\n");

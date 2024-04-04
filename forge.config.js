const path = require('path');
const fs = require('fs/promises');
module.exports = {
  packagerConfig: {
    asar: true,
    icon: "public/images/MyApp.icns",
    osxSign: {},
    osxNotarize: {},
    protocols: [
      {
        name: "Sequel",
        schemes: ["sequel"],
      },
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      arch: ["arm64", "x64"],
      config: {
        icon: "public/images/MyApp.icns",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      arch: ["arm64", "x64"],
    },
    {
      name: "@electron-forge/maker-deb",
      arch: ["arm64", "x64"],
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      arch: ["arm64", "x64"],
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {
        icon: "public/images/MyApp.icns",
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-s3",
      arch: ["arm64", "x64"],
      config: {},
    },
  ],
  hooks: {
    packageAfterPrune: async (_config, buildPath) => {
      const gypPath = path.join(
        buildPath,
        'node_modules',
        'fs-xattr',
        'build',
        'node_gyp_bins'
      );
      await fs.rm(gypPath, {recursive: true, force: true});
   }
 }
};

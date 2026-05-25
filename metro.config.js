const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchOptions = {
  aggregateTimeout: 300,
  ignored: /\/node_modules\/.+\.(json|map)$/,
};

module.exports = withNativeWind(config, { input: "./global.css" });

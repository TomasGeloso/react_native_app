const { getDefaultConfig } = require("expo/metro-config");
const withNativewind = require("nativewind/metro").withNativeWind;

const createConfig = () => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer, 
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };
  return config;
}

const config = createConfig();

module.exports = withNativewind(config , { input: "./global.css" });
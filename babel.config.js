/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          extensions: [
            ".ios.js",
            ".android.js",
            ".ios.jsx",
            ".android.jsx",
            ".js",
            ".jsx",
            ".json",
            ".ts",
            ".tsx"
          ],
          alias: {
            "@src": "./src",
            "@app": "./app",
            "@utils": "./utils",
            "@hooks": "./hooks",
            "@theme": "./theme",
            "@assets": "./assets",
            "@services": "./services",
            "@constants": "./constants",
            "@components": "./components"
          }
        }
      ]
    ]
  }
}

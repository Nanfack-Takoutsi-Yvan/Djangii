/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
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
            "@locales": "./locales",
            "@typings": "./typings",
            "@services": "./services",
            "@constants": "./constants",
            "@components": "./components"
          }
        }
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false
        }
      ]
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"]
      }
    }
  }
}

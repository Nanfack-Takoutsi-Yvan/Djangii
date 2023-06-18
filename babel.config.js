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
            "@theme": "./theme",
            "@assets": "./assets",
            "@typings": "./typings",
            "@services": "./services",
            "@utils": "./services/utils",
            "@hooks": "./services/hooks",
            "@components": "./components",
            "@locales": "./assets/locales",
            "@constants": "./assets/constants"
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

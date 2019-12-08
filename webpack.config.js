const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const NodemonPlugin = require("nodemon-webpack-plugin")

const nodeModules = path.resolve(__dirname, "node_modules")
const buildPath = path.resolve(__dirname, "build")
const apiPath = path.resolve(__dirname, "pm-api")
const uiPath = path.resolve(__dirname, "pm-ui")

console.log(`====> Base build directory: [${buildPath}]`)
console.log(`====> Environment: [${JSON.stringify(process.env, undefined, 2)}]`)

const wpc = {
  entry: {
    api: path.resolve(apiPath, "index.ts"),
    ui: path.resolve(uiPath, "index.tsx")
  },
  devtool: "source-map",
  target: 'node',
  output: {
    filename: "[name].js",
    path: buildPath
  },
  module: {
    rules: [
      {test: /\.tsx?$/, use: ["cache-loader", "ts-loader"], exclude: /node_modules/},
      {test: /\.tsx?$/, enforce: "pre", use: ["tslint-loader"], exclude: /node_modules/},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      { 
        test: /\.(ttf|eot|woff2|woff|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader", options: {limit: 96000, name: "fonts/[hash]-[name].[ext]"}
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader", options: {sassOptions: {includePaths: [nodeModules]}}}
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [nodeModules, path.resolve(__dirname)],
    alias: {
      react: path.resolve(nodeModules, "preact/compat"),
      "react-dom": path.resolve(nodeModules, "preact/compat")
    }
  },
  plugins: [
    new CopyPlugin([{from: "pm-ui/favicon.ico", to: buildPath}]),
    new NodemonPlugin({
      nodeArgs: process.env.DEBUG ? ["--inspect-brk"] : [],
      verbose: true, script: path.resolve(buildPath, "api.js")
    })
  ]
}

module.exports = wpc

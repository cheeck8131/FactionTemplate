import { Configuration } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import path from "path";
import nodeExternals from "webpack-node-externals";

const config = <Configuration>{
  target: "node",
  mode: "development",
  externals: [nodeExternals({})],
  entry: "./src/server/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist/packages/gamemode"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: path.join(__dirname, "src"),
        configFile: path.join(__dirname, "tsconfig.json"),
        extensions: [".js", ".ts"],
      }),
    ],
  },
  plugins: [],
};

export default config;

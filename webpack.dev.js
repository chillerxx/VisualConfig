const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development', // 设置mode环境
  entry: "./src/demo/index.js", //* 配置入口文件
  devtool: "cheap-module-source-map", // 报错的时候在控制台输出哪一行报错
  output: {
    //* 用于配置打包后的信息
    path: path.resolve(__dirname, "dist"), //* 打包后的路径
    filename: "app.js", //* 打包后的入口文件
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname, "src"),
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        // 图片解析
        test: /\.(png|jpg|jpeg|gif)(\?|$)/i,
        include: path.resolve(__dirname, "src")
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", //* 配置index映射路径
      filename: 'index.html'//* 指定生成文件名称
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    open: false,//* 编译好后是否自动打开浏览器
    port: 3001 //运行的端口
  },
};

const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将CSS提取出来，而不是和js混在一起
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 对CSS进行压缩
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 每次打包前清除旧的build文件夹
const TerserPlugin = require("terser-webpack-plugin"); // 对js进行压缩


module.exports = {
  mode: 'production', // 设置mode环境
  entry: "./src/index.js", //* 配置入口文件
  output: {
    //* 用于配置打包后的信息
    path: path.resolve(__dirname, "dist"), //* 打包后的路径
    //publicPath: '/dist/',
    filename: "visualreportconfig.js",
    library: {
      name: 'visual-config-report',
      type: 'umd'
    }
  },
  stats: {
    children: false, // 不输出子模块的打包信息
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
      }),
      new CssMinimizerPlugin(),
    ],
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: 'lodash',
    },
    antd: {
      commonjs: 'antd',
      commonjs2: 'antd',
      amd: 'antd',
      root: 'antd',
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname, "src/"),
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ['style-loader', "css-loader", "postcss-loader"],
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          'style-loader',
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
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "style.css", // 生成的文件名
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "index.html", // 生成的html存放路径，相对于 output.path
    //   template: "./public/index.html", // html模板路径
    //   hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
    //   inject: true, // 是否将js放在body的末尾
    //   // 正式环境，把注册service-worker的代码加入到index.html中
    //   registerServiceWorker: `<script>
    //     if ("serviceWorker" in navigator) {
    //       window.addEventListener("load", () => {
    //         navigator.serviceWorker.register("./service-worker.js");
    //       });
    //     }
    //   </script>`,
    // }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};

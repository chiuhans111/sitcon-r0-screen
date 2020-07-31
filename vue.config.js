const path = require("path");
// vue.config.js
module.exports = {
  // options...
  publicPath: "./",
  assetsDir: "./",
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "/src"));
  },
};

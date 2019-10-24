module.exports = {
  transpileDependencies: [
    /\bvue-awesome\b/
  ],
  css: {
    loaderOptions: {
      sass: {
        data: `@import "./src/assets/scss/variables.scss";`
      }
    }
  }
}

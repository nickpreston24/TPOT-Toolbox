const {
  override,
  disableEsLint,
  overrideDevServer,
  watchAll,
  addDecoratorsLegacy,
} = require("customize-cra");

module.exports = {
  webpack: override(
    // usual webpack plugin
    addDecoratorsLegacy(),
    disableEsLint()
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  )
};
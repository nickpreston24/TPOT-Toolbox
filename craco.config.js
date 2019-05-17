reactHotReloadPlugin = require('craco-plugin-react-hot-reload');

module.exports = {
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["react-hot-loader/babel", { safetyNet: false }]
        ]
    },
    // plugins: [{
    //     plugin: reactHotReloadPlugin
    // }]
}
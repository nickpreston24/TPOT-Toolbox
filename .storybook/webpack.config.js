module.exports = async ({ config, mode }) => {

    // Decorator Syntax Support for MobX and Typescript
    config.module.rules.push({
		test: /(\.js|\.jsx|\.stories\.jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                  ],
                plugins: [
                    ["@babel/plugin-proposal-decorators", { "legacy": true}],
                    ["@babel/plugin-proposal-class-properties", { "loose": true}]
                ],
			},
		},
	});

    // Return the altered config
    return config;
  }
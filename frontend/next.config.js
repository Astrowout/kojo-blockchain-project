const withTM = require("next-transpile-modules")(["@ionic/react", "@ionic/core", "@stencil/core", "ionicons"]);

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		})

		return config;
	},
	images: {
		loader: "custom",
	},
};

module.exports = withTM(nextConfig);

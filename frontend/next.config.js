const withTM = require("next-transpile-modules")(["@ionic/react", "@ionic/core", "@stencil/core", "ionicons"]);
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

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
	pwa: {
		dest: 'public',
		runtimeCaching,
	},
};

module.exports = withPWA(withTM(nextConfig));

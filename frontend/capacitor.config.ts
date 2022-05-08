import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "xyz.kojo",
	appName: "kojo",
	webDir: "out",
	bundledWebRuntime: false,
	plugins: {
		SplashScreen: {
			launchShowDuration: 1000,
			androidScaleType: "CENTER_CROP",
		},
	},
};

export default config;

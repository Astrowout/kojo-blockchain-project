import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "xyz.kojo",
	appName: "kojo",
	webDir: "build",
	bundledWebRuntime: false,
	plugins: {
		SplashScreen: {
			androidScaleType: "CENTER_CROP",
		},
	},
};

export default config;

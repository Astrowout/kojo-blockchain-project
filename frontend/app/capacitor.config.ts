import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "xyz.kojo",
	appName: "kojo",
	webDir: "out",
	bundledWebRuntime: false,
	plugins: {
		SplashScreen: {
			launchAutoHide: false,
			androidScaleType: "CENTER_CROP",
		},
	},
};

export default config;

import dynamic from "next/dynamic";

// UI components (both marketing and app)
export { default as Logo } from "./ui/Logo/Logo";
export { default as Icon } from "./ui/Icon/Icon";
export { default as Link } from "./ui/Link/Link";
export { default as Button } from "./ui/Button/Button";
export { default as Image } from "./ui/Image/Image";

// Marketing components
export { default as MHeader } from "./marketing/Header/Header";
export { default as MFooter } from "./marketing/Footer/Footer";
export { default as MBottomBar } from "./marketing/BottomBar/BottomBar";
export { default as MHero } from "./marketing/Hero/Hero";
export { default as MPartners } from "./marketing/Partners/Partners";
export { default as MHow } from "./marketing/How/How";
export { default as MToken } from "./marketing/Token/Token";
export { default as MCta } from "./marketing/Cta/Cta";

// App components
export { default as AppLayout } from "./app/Layout/Layout";
export { default as AppHeader } from "./app/Header/Header";
export { default as Onboarding } from "./app/Onboarding/Onboarding";

// Make sure AppShell is always only rendered on the client side and never on the server.
const AppShell = dynamic(() => import("./app/Shell/Shell"), {
	ssr: false,
});
export { AppShell };

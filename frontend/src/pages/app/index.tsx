import dynamic from "next/dynamic";

import {
	Image,
	Onboarding,
} from "@/components";

const AppShell = dynamic(
	() => import("@/components/app/AppShell/AppShell"),
	{ ssr: false, },
)

import onboardingImage from "@/assets/img/onboarding.jpg";

const OnboardingPage = () => {
	return (
		<AppShell>
			<main className="flex justify-center min-h-screen relative">
				<div className="absolute inset-0 z-10 bg-gradient-to-t from-emerald-900 to-transparent"></div>

				<Image
					src={onboardingImage}
					alt="Water management for plants"
					layout="fill"
					className="absolute inset-0 object-cover min-h-full"
				/>

				<Onboarding className="relative z-10" />
			</main>
		</AppShell>
	)
}

export default OnboardingPage;

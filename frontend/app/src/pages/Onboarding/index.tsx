import {
	Onboarding,
} from "@/components";

import onboardingImage from "@/assets/img/onboarding.jpg";
import { IonPage, IonContent } from "@ionic/react";

const OnboardingPage = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<main className="flex justify-center min-h-screen relative">
					<div className="absolute inset-0 z-10 bg-gradient-to-t from-emerald-900 to-transparent sm:hidden"></div>
					<img
						src={onboardingImage}
						alt="Water management for plants"
						className="absolute inset-0 object-cover min-h-full"
					/>
					<Onboarding className="relative z-10" />
				</main>
			</IonContent>
		</IonPage>
	)
}

export default OnboardingPage;

import {
	Banner,
	Onboarding,
} from "../../components";

import { IonPage, IonContent } from "@ionic/react";

const OnboardingPage = () => {

	return (
		<IonPage>
			<Banner />

			<IonContent fullscreen>
				<div className="flex justify-center flex-grow">
					<Onboarding />
				</div>
			</IonContent>
		</IonPage>
	)
}

export default OnboardingPage;

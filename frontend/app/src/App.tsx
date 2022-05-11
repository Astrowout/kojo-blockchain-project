import { Route } from 'react-router-dom';
import { StatusBar, Style } from "@capacitor/status-bar";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import {
	OnboardingPage,
	DashboardPage,
	ConsumptionPage,
	NewSeedPage,
	PlantsPage,
	PlantPage,
	NotFoundPage,
} from "./pages";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './styles/variables.css';
import './styles/main.css';

setupIonicReact();

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
	try {
		  await StatusBar.setStyle({
			style: status.matches ? Style.Dark : Style.Light,
		  });
	} catch {}
});

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path="/" exact component={OnboardingPage} />
					<Route path="/dashboard" exact component={DashboardPage} />
					<Route path="/consumption" component={ConsumptionPage} />
					<Route path="/plants" component={PlantsPage} />
					<Route path="/plant" component={PlantPage} />
					<Route path="/new-seed" component={NewSeedPage} />
					<Route component={NotFoundPage} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;

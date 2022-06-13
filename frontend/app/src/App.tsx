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
	NewSeedPage,
	SettingsPage,
	PlantPage,
	HydratePage,
	NotFoundPage,
	ClaimPage,
	NotificationsPage,
	NftPage,
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

import { Tabs } from './components';
import { GlobalProvider } from './context';

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
				<GlobalProvider>
					<IonRouterOutlet>
						<Route path="/" exact component={OnboardingPage} />
						<Route path="/tabs" component={Tabs} />
						<Route path="/plants/:id" exact component={PlantPage} />
						<Route path="/plants/:id/hydrate" component={HydratePage} />
						<Route path="/nft/:id" component={NftPage} />
						<Route path="/settings" component={SettingsPage} />
						<Route path="/notifications" component={NotificationsPage} />
						<Route path="/claim" component={ClaimPage} />
						<Route path="/new-seed" exact component={NewSeedPage} />
						<Route component={NotFoundPage} />
					</IonRouterOutlet>
				</GlobalProvider>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;

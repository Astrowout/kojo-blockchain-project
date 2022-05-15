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

import { Tabs } from './components';
import { AuthProvider } from './context';

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
		<AuthProvider>
			<IonApp>
				<IonReactRouter>
					<IonRouterOutlet>
						<Route path="/" exact component={OnboardingPage} />
						<Route path="/tabs" component={Tabs} />
						<Route path="/plant" component={PlantPage} />
						<Route path="/settings" component={SettingsPage} />
						<Route path="/new-seed" exact component={NewSeedPage} />
						<Route component={NotFoundPage} />
					</IonRouterOutlet>
				</IonReactRouter>
			</IonApp>
		</AuthProvider>
	);
};

export default App;

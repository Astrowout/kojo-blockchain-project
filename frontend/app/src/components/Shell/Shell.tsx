// @ts-nocheck
import { PropsWithChildren } from "react";
import type { NextPage } from "next";
import { IonApp, IonRouterOutlet } from "@ionic/react";

import {
	OnboardingPage,
	DashboardPage,
	ConsumptionPage,
	NewSeedPage,
	PlantsPage,
	PlantPage,
	NotFoundPage,
} from "@routes";
import { Route } from "react-router";
import { IonReactRouter } from "@ionic/react-router";

type AppShellProps = {};

const AppShell: NextPage<PropsWithChildren<AppShellProps>> = () => {
	return (
		<IonApp className="font-sans">
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path="/app" exact component={OnboardingPage} />
					<Route path="/app/dashboard" exact component={DashboardPage} />
					<Route path="/consumption" component={ConsumptionPage} />
					<Route path="/plants" component={PlantsPage} />
					<Route path="/plant" component={PlantPage} />
					<Route path="/new-seed" component={NewSeedPage} />
					<Route component={NotFoundPage} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
};

export default AppShell;

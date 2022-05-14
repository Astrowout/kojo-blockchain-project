import { IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import type { FC, PropsWithChildren } from "react";
import { Redirect, Route } from "react-router";
import { AppLayoutProps } from "./Layout.types";
// import Tab1 from '../../pages/Tab1';
// import Tab2 from '../../pages/Tab2';
// import Tab3 from '../../pages/Tab3';
import AppHeader from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
	children,
	title,
	description,
	backLink,
}) => (
	<IonPage className="flex flex-row">
		<Sidebar className="hidden md:flex" />

		<div className="flex-grow">
			<AppHeader
				title={title}
				description={description}
				backLink={backLink}
			>
			</AppHeader>

			<main>
				{children}
			</main>
		</div>

		{/* <IonTabs>
				<IonRouterOutlet>
					<Route exact path="/tab1">
						<Tab1 />
					</Route>
					<Route exact path="/tab2">
						<Tab2 />
					</Route>
					<Route path="/tab3">
						<Tab3 />
					</Route>
					<Route exact path="/">
						<Redirect to="/tab1" />
					</Route>
			</IonRouterOutlet>
					<IonTabBar slot="bottom">
					<IonTabButton tab="tab1" href="/tab1">
						<IonLabel>Tab 1</IonLabel>
					</IonTabButton>
					<IonTabButton tab="tab2" href="/tab2">
						<IonLabel>Tab 2</IonLabel>
					</IonTabButton>
					<IonTabButton tab="tab3" href="/tab3">
						<IonLabel>Tab 3</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs> */}
	</IonPage>
);

export default AppLayout;

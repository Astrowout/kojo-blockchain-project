import { FC, memo } from "react";

import { TabsProps } from "./Tabs.types";
import { useTranslation } from "../../hooks";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { ConsumptionPage, DashboardPage, PlantsPage, LeaderboardPage } from "../../pages";
import Icon from "../Icon/Icon";

const Tabs: FC<TabsProps> = () => {
	const { t } = useTranslation();

	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact path="/tabs" to="/tabs/dashboard" />
				<Route path="/tabs/dashboard" exact component={DashboardPage} />
				<Route path="/tabs/plants" exact component={PlantsPage} />
				<Route path="/tabs/leaderboard" exact component={LeaderboardPage} />
				<Route path="/tabs/consumption" exact component={ConsumptionPage} />
			</IonRouterOutlet>

			<IonTabBar slot="bottom" className="md:hidden bg-white" style={{ background: 'white' }}>
				<IonTabButton tab="dashboard" href="/tabs/dashboard" className="space-y-1">
					<Icon
						name="Dashboard"
						size={24}
					/>

					<IonLabel className="whitespace-nowrap font-bold text-2xs sm:text-xs">
						{ t("navigation.dashboard") }
					</IonLabel>
				</IonTabButton>

				<IonTabButton tab="plants" href="/tabs/plants" className="space-y-1">
					<Icon
						name="Plants"
						size={24}
					/>

					<IonLabel className="whitespace-nowrap font-bold text-2xs sm:text-xs">
						{ t("navigation.plants") }
					</IonLabel>
				</IonTabButton>

				<IonTabButton tab="leaderboard" href="/tabs/leaderboard" className="space-y-1">
					<Icon
						name="Ranking"
						size={24}
					/>

					<IonLabel className="whitespace-nowrap font-bold text-2xs sm:text-xs">
						{ t("navigation.leaderboard") }
					</IonLabel>
				</IonTabButton>

				<IonTabButton tab="consumption" href="/tabs/consumption" className="space-y-1">
					<Icon
						name="Consumption"
						size={24}
					/>

					<IonLabel className="whitespace-nowrap font-bold text-2xs sm:text-xs">
						{ t("navigation.consumption") }
					</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default memo(Tabs);

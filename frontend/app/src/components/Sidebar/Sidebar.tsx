import { FC, memo, useContext } from "react";
import cn from "classnames";

import { SidebarProps } from "./Sidebar.types";
import { useTranslation } from "../../hooks";
import Logo from "../Logo/Logo";
import NavLink from "../NavLink/NavLink";
import { IonRouterLink } from "@ionic/react";
import { SessionContext } from "../../context";

const Sidebar: FC<SidebarProps> = ({ className }) => {
	const { t } = useTranslation();
	const {
		notifications,
	} = useContext(SessionContext);

	return (
		<nav
			className={cn(
				className,
				"z-10 pl-10 pr-4 pt-14 pb-12 flex flex-col h-screen justify-between bg-white shadow-2xl shadow-emerald-600/20 w-full max-w-xs lg:max-w-sm"
			)}
		>
			<div className="flex flex-col">
				<IonRouterLink
					routerLink="/tabs/dashboard"
					routerDirection="root"
				>
					<Logo w={140} />
				</IonRouterLink>

				<div className="mt-20 flex flex-col space-y-10">
					<NavLink url="/tabs/dashboard" icon="Dashboard">
						{ t("navigation.dashboard") }
					</NavLink>

					<NavLink url="/tabs/plants" icon="Plants">
						{ t("navigation.plants") }
					</NavLink>

					<NavLink url="/tabs/consumption" icon="Consumption">
						{ t("navigation.consumption") }
					</NavLink>
				</div>
			</div>

			<div className="flex flex-col space-y-8">
				<NavLink url="/notifications" icon="Bell" unread={notifications && !!notifications.length}>
					{ t("navigation.notifications") }
				</NavLink>

				<NavLink url="/settings" icon="Settings">
					{ t("navigation.settings") }
				</NavLink>
			</div>
		</nav>
	)
}

export default memo(Sidebar);

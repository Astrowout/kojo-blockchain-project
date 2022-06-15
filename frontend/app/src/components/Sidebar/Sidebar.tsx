import { FC, memo, useContext } from "react";
import cn from "classnames";

import { SidebarProps } from "./Sidebar.types";
import { useTranslation } from "../../hooks";
import Logo from "../Logo/Logo";
import NavLink from "../NavLink/NavLink";
import { IonRouterLink } from "@ionic/react";
import { GlobalContext, SessionContext } from "../../context";

const Sidebar: FC<SidebarProps> = ({ className }) => {
	const { t } = useTranslation();
	const {
		notifications,
	} = useContext(SessionContext);

	const {
		disconnect,
	} = useContext(GlobalContext);

	const unread = notifications?.some((notification) => !notification.read);

	return (
		<nav
			className={cn(
				className,
				"z-10 pl-10 pr-4 pt-14 pb-12 flex flex-col h-screen justify-between bg-white shadow-lg w-full max-w-xs lg:max-w-sm"
			)}
		>
			<div className="flex flex-col">
				<IonRouterLink
					routerLink="/tabs/dashboard"
					routerDirection="root"
				>
					<div className="flex items-center">
						<Logo w={132} />
						<p className="font-display uppercase text-4xl -ml-16 text-black">Kōjō</p>
					</div>

				</IonRouterLink>

				<div className="mt-20 flex flex-col space-y-10 p-6">
					<NavLink url="/tabs/dashboard" icon="Dashboard">
						{ t("navigation.dashboard") }
					</NavLink>

					<NavLink url="/tabs/plants" icon="Plants">
						{ t("navigation.plants") }
					</NavLink>

					<NavLink url="/tabs/leaderboard" icon="Ranking">
						{ t("navigation.leaderboard") }
					</NavLink>

					<NavLink url="/tabs/consumption" icon="Consumption">
						{ t("navigation.consumption") }
					</NavLink>
				</div>
			</div>

			<div className="flex flex-col space-y-8 p-6">
				<NavLink url="/notifications" icon="Bell" unread={unread}>
					{ t("navigation.notifications") }
				</NavLink>

				<NavLink url="/settings" icon="Settings">
					{ t("navigation.settings") }
				</NavLink>
				<div onClick={disconnect} >
				<NavLink url="/settings" icon="Logout" className='text-red-700'>

					{ t("settings.disconnect") }

				</NavLink>
				</div>
			</div>
		</nav>
	)
}

export default memo(Sidebar);

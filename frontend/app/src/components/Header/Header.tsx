import { FunctionComponent, memo, useContext } from "react";
import cn from "classnames";
import { useRouteMatch } from "react-router-dom";

import {
	Icon,
} from "../../components";
import { HeaderProps } from "./Header.types";
import { IonHeader, IonRouterLink } from "@ionic/react";

import { Link, useHistory } from "react-router-dom";
import { SessionContext } from "../../context";

const Header: FunctionComponent<HeaderProps> = ({
	title = "",
	description = "",
	backLink = null,
	withOverlap = true,
}) => {
	const {
		notifications
	} = useContext(SessionContext);
	const history = useHistory();
	const tabsView = useRouteMatch({
		path: "/tabs",
	});

	const unread = notifications?.some((notification) => !notification.read);

	return (
		<IonHeader className="bg-background relative -z-10 text-black shadow-none drop-shadow-none ion-no-border ion-no-shadow border-b border-border" style={{ shadow: 'none' }}>
			<div className="absolute inset-0 z-10 bg-opacity-90"></div>

			{/* <img
				src={headerImage}
				alt="Water management for plants"
				aria-hidden="true"
				className="absolute inset-0 object-cover w-full h-full"
			/> */}

			<div
				className={cn("px-4 sm:px-8 lg:px-12 2xl:max-w-screen-xl mx-auto pt-8 md:pt-14 md:pb-24 relative z-10 shadow-none drop-shadow-none", {
					"pb-16": withOverlap,
					"pb-8": !withOverlap,
				})}
			>
				<div className="flex justify-between shadow-none drop-shadow-none">
					<div className="flex items-center">
						{backLink && typeof backLink === "boolean" && (
							<button
								type="button"
								onClick={history.goBack}
								className="mr-3 flex text-black hover:text-kojo hover:-translate-x-1 transition"
							>
								<Icon name="ArrowLeft" size={28}></Icon>

								<span className="sr-only">
									Go back
								</span>
							</button>
						)}

						{backLink && typeof backLink === "string" && (
							<Link to={backLink} className="mr-3 flex text-black">
								<Icon name="ArrowLeft" size={28}></Icon>

								<span className="sr-only">
									Go back
								</span>
							</Link>
						)}

						<h1 className="font-bold text-xl sm:text-2xl md:text-4xl font-display uppercase text-black">
							{ title }
						</h1>
					</div>

					{tabsView && (
						<div className="flex space-x-3 items-center md:hidden">
							<IonRouterLink
								className="w-8 h-8 flex items-center justify-center text-black"
								routerLink="/settings"
							>
								<Icon name="Settings" size={24}></Icon>

								<span className="sr-only">
									Settings
								</span>
							</IonRouterLink>

							<IonRouterLink
								className="w-8 h-8 flex items-center justify-center relative text-black"
								routerLink="/notifications"
							>
								<Icon name="Bell" size={24}></Icon>

								<span className="sr-only">
									Notifications
								</span>

								{unread && (
									<span className="absolute flex top-1.5 right-2">
										<span className="animate-ping absolute flex w-full h-full rounded-full bg-red-800 opacity-60"></span>
										<span className="relative flex rounded-full h-2 w-2 border border-white bg-red-800"></span>
									</span>
								)}
							</IonRouterLink>
						</div>
					)}
				</div>

				{description && (
					<p className="mt-4 max-w-prose font-text text-xs leading-6">
						{ description }
					</p>
				)}
			</div>
		</IonHeader>
	)
}

export default memo(Header);

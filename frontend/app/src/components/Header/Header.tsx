import { FunctionComponent, memo, useContext } from "react";
import cn from "classnames";
import { useRouteMatch } from "react-router-dom";

import {
	Icon,
} from "../../components";
import { HeaderProps } from "./Header.types";
import { IonHeader, IonRouterLink } from "@ionic/react";

import headerImage from "../../assets/img/onboarding.jpg";
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
		<IonHeader className="bg-emerald-600 relative -z-10">
			<div className="absolute inset-0 z-10 bg-emerald-600 bg-opacity-90"></div>

			<img
				src={headerImage}
				alt="Water management for plants"
				aria-hidden="true"
				className="absolute inset-0 object-cover w-full h-full"
			/>

			<div
				className={cn("px-4 sm:px-8 lg:px-12 2xl:max-w-screen-xl mx-auto pt-8 md:pt-14 md:pb-24 relative z-10", {
					"pb-16": withOverlap,
					"pb-8": !withOverlap,
				})}
			>
				<div className="text-white flex justify-between">
					<div className="flex items-center">
						{backLink && typeof backLink === "boolean" && (
							<button
								type="button"
								onClick={history.goBack}
								className="mr-3 flex text-emerald-100 hover:text-white hover:-translate-x-1 transition"
							>
								<Icon name="ArrowLeft" size={28}></Icon>

								<span className="sr-only">
									Go back
								</span>
							</button>
						)}

						{backLink && typeof backLink === "string" && (
							<Link to={backLink} className="mr-3 flex text-emerald-100">
								<Icon name="ArrowLeft" size={28}></Icon>

								<span className="sr-only">
									Go back
								</span>
							</Link>
						)}

						<h1 className="font-bold text-xl sm:text-2xl md:text-4xl">
							{ title }
						</h1>
					</div>

					{tabsView && (
						<div className="flex space-x-3 items-center md:hidden">
							<IonRouterLink
								className="w-8 h-8 flex items-center justify-center text-white"
								routerLink="/settings"
							>
								<Icon name="Settings" size={24}></Icon>

								<span className="sr-only">
									Settings
								</span>
							</IonRouterLink>

							<IonRouterLink
								className="w-8 h-8 flex items-center justify-center relative text-white"
								routerLink="/notifications"
							>
								<Icon name="Bell" size={24}></Icon>

								<span className="sr-only">
									Notifications
								</span>

								{unread && (
									<span className="absolute flex top-1.5 right-2">
										<span className="animate-ping absolute flex w-full h-full rounded-full bg-red-500 opacity-60"></span>
										<span className="relative flex rounded-full h-2 w-2 border border-white bg-red-500"></span>
									</span>
								)}
							</IonRouterLink>
						</div>
					)}
				</div>

				{description && (
					<p className="text-emerald-100 text-sm md:text-base mt-3 leading-relaxed max-w-prose">
						{ description }
					</p>
				)}
			</div>
		</IonHeader>
	)
}

export default memo(Header);

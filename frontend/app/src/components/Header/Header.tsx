import { FunctionComponent } from "react";

import { useNotifications } from "../../hooks";
import {
	Icon,
} from "../../components";
import { AppHeaderProps } from "./Header.types";
import { IonHeader } from "@ionic/react";

import headerImage from "../../assets/img/onboarding.jpg";
import { Link } from "react-router-dom";

const AppHeader: FunctionComponent<AppHeaderProps> = ({
	title = "",
	description = "",
	backLink = "",
}) => {
	const { unread } = useNotifications();

	return (
		<IonHeader className="bg-emerald-600">
			<div className="absolute inset-0 z-10 bg-emerald-600 bg-opacity-90"></div>

			<img
				src={headerImage}
				alt="Water management for plants"
				aria-hidden="true"
				className="absolute inset-0 object-cover w-full h-full md:hidden"
			/>

			<div className="px-4 sm:px-8 md:px-12 pt-8 pb-16 md:pt-14 md:pb-24 relative z-10">
				<div className="text-white flex justify-between">
					<div className="flex items-center">
						{backLink && (
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

					<div className="flex space-x-3 items-center md:hidden">
						<button
							className="w-8 h-8 flex items-center justify-center"
							type="button"
						>
							<Icon name="Settings" size={24}></Icon>

							<span className="sr-only">
								Settings
							</span>
						</button>

						<button
							className="w-8 h-8 flex items-center justify-center relative"
							type="button"
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
						</button>
					</div>
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

export default AppHeader;

import { IonContent, IonPage } from "@ionic/react";
import cn from "classnames";
import type { FC, PropsWithChildren } from "react";

import { AppLayoutProps } from "./Layout.types";
import AppHeader from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
	children,
	className = "",
	title,
	description,
	backLink,
	withOverlap = true,
}) => (
	<IonPage className="flex flex-row bg-background">
		<Sidebar className="hidden md:flex" />

		<IonContent fullscreen className='bg-red-600 !important'>
			<AppHeader
				title={title}
				description={description}
				backLink={backLink}
				withOverlap={withOverlap}
			>
			</AppHeader>

			<div
				className={cn(className, "md:-mt-14 pb-20 px-4 sm:px-8 lg:px-12 2xl:max-w-screen-xl mx-auto w-full flex flex-col flex-grow", {
					"-mt-8": withOverlap,
					"mt-8": !withOverlap,
				})}
			>
				{children}
			</div>
		</IonContent>
	</IonPage>
);

export default AppLayout;

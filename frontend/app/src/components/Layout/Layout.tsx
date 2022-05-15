import { IonContent, IonPage } from "@ionic/react";
import cn from "classnames";
import type { FC, PropsWithChildren } from "react";

import { AppLayoutProps } from "./Layout.types";
import AppHeader from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
	children,
	title,
	description,
	backLink,
	withOverlap = true,
}) => (
	<IonPage className="flex flex-row">
		<Sidebar className="hidden md:flex" />

		<IonContent className="flex-grow" fullscreen>
			<AppHeader
				title={title}
				description={description}
				backLink={backLink}
				withOverlap={withOverlap}
			>
			</AppHeader>

			<div
				className={cn("md:-mt-14 px-4 sm:px-8 md:px-12 2xl:container", {
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

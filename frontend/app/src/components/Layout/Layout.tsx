import type { NextPage } from "next";
import type { PropsWithChildren } from "react";
import AppHeader from "../Header/Header";
import { AppLayoutProps } from "./Layout.types";

const AppLayout: NextPage<PropsWithChildren<AppLayoutProps>> = ({
	children,
	title,
	description,
	backLink,
}) => (
	<>
		<AppHeader
			title={title}
			description={description}
			backLink={backLink}
		>
		</AppHeader>

		<main>
			{children}
		</main>

		<footer>

		</footer>
	</>
);

export default AppLayout;

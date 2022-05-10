import type { NextPage } from "next";
import type { PropsWithChildren } from "react";
import AppHeader from "../Header/Header";

type AppLayoutProps = {};

const AppLayout: NextPage<PropsWithChildren<AppLayoutProps>> = ({
	children,
}) => (
	<>
		<AppHeader>
			test
		</AppHeader>

		<main>
			{children}
		</main>

		<footer>

		</footer>
	</>
);

export default AppLayout;

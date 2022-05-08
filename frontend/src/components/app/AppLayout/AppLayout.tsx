import type { NextPage } from "next";
import type { PropsWithChildren } from "react";

type AppLayoutProps = {};

const AppLayout: NextPage<PropsWithChildren<AppLayoutProps>> = ({
	children,
}) => (
	<>
		<header>

		</header>

		<main>
			{children}
		</main>

		<footer>

		</footer>
	</>
);

export default AppLayout;

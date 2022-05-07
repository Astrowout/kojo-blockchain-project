import type { NextPage } from "next";

interface AppLayoutProps {
	children?: JSX.Element | string;
}

const AppLayout: NextPage<AppLayoutProps> = ({
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

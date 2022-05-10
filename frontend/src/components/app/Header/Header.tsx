import { FunctionComponent } from "react";
import cn from "classnames";

import { useTranslation } from "@/hooks";
import {
	Logo,
	Icon,
	Button,
	Link,
} from "@/components";
import { AppHeaderProps } from "./Header.types";

const AppHeader: FunctionComponent<AppHeaderProps> = ({ className }) => {
	const { t } = useTranslation();

	const renderNavigation = () => (
		<nav className="flex flex-col md:flex-row md:items-center gap-x-12 gap-y-3">
			<Link
				url="#"
				icon="External"
				newTab
			>
				{ t("navigation.download") }
			</Link>

			<Link
				url="https://github.com/wowtvds/kojo-blockchain-project"
				icon="External"
				newTab
			>
				GitHub
			</Link>

			<Button
				url="/app"
				compact
			>
				{ t("navigation.app") }
			</Button>
		</nav>
	);

	return (
		<header>
			test
		</header>
	)
}

export default AppHeader;

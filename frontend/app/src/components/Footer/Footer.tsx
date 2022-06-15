import { FunctionComponent, memo } from "react";
import cn from "classnames";

import {
	Logo,
	Icon,
} from "..";
import { FooterProps } from "./Footer.types";
import { IonFooter } from "@ionic/react";
import { useTranslation } from "../../hooks";

const Footer: FunctionComponent<FooterProps> = ({
	version = "",
	className,
}) => {
	const { t } = useTranslation();

	return (
		<IonFooter className={cn(className, "flex flex-col items-center text-gray-400")}>
			<Logo w={80} blank className="text-gray-300" />

			<p className="mt-3 text-sm">
				{ t("footer.title", <Icon name="Heart" size={16} className="inline mb-1" />) }
			</p>

			{version && (
				<p className="text-sm font-bold font-mono mt-10 bg-gray-100 px-3 py-1 rounded-md">
					v{ version }
				</p>
			)}
		</IonFooter>
	)
}

export default memo(Footer);

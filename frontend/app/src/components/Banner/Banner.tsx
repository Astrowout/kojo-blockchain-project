import { FunctionComponent, memo } from "react";

import { useTranslation } from "../../hooks";
import {
	Icon,
} from "..";
import { BannerProps } from "./Banner.types";
import { IonHeader } from "@ionic/react";

const Banner: FunctionComponent<BannerProps> = () => {
	const { t } = useTranslation();

	return (
		<IonHeader>
			<div className="bg-emerald-600 flex justify-center px-4 sm:px-8 py-2 space-x-3 text-white">
				<Icon
					name="Danger"
					size={22}
					className="flex-shrink-0"
				/>

				<p className="font-bold text-sm mt-[1px]">
					{ t("general.testnet",
						<a
							href="https://faucet.polygon.technology/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							{ t("general.faucet") }
						</a>
					) }
				</p>
			</div>
		</IonHeader>
	)
}

export default memo(Banner);

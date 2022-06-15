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
								<div className="xl:col-span-2 flex justify-center space-x-3 bg-black p-6 items-center">
						<div className="flex items-center">
						<Icon
							name="Danger"
							size={18}
							className="flex-shrink-0 mr-3 text-background"
						/>

						<p className="flex items-center font-text text-xs text-background">
							{ t("general.testnet",

							) }
						</p>
						</div>

								<a
									href="https://faucet.polygon.technology/"
									target="_blank"
									rel="noopener noreferrer"
									className="font-title uppercase text-kojo-light text-xs  min-w-[9em]"
								>
									{ t("general.faucet") }
								</a>
					</div>
		</IonHeader>
	)
}

export default memo(Banner);

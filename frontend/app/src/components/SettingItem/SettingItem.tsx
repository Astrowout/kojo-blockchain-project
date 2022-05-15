import { FC } from "react";
import cn from "classnames";

import { SettingItemProps } from "./SettingItem.types";
import { useTranslation } from "../../hooks";

const SettingItem: FC<SettingItemProps> = ({
	children,
	title,
	className,
}) => {
	const { t } = useTranslation();

	return (
		<div
			className={cn(className, "flex flex-col space-y-4")}
		>
			<div className="flex justify-between">
				<p className="text-lg">
					{ title }
				</p>

				<div className="flex space-x-2 items-center">
					<div className="relative flex">
						<span className="animate-ping absolute flex w-full h-full rounded-full bg-green-500 opacity-60"></span>
						<span className="relative flex rounded-full h-2 w-2 border border-white bg-green-500"></span>
					</div>

					<p className="uppercase font-semibold text-sm">
						{ t("settings.connected") }
					</p>
				</div>
			</div>

			<div className="bg-emerald-50 shadow-inner rounded-2xl text-xl px-6 py-4 flex justify-center">
				{ children }
			</div>
		</div>
	)
}

export default SettingItem;

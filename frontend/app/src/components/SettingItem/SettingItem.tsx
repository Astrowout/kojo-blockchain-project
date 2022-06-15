import { FC, memo } from "react";
import cn from "classnames";

import { SettingItemProps } from "./SettingItem.types";
import { useTranslation } from "../../hooks";
import Icon from "../Icon/Icon";

const SettingItem: FC<SettingItemProps> = ({
	children,
	actionSlot,
	title,
	connected = true,
	className,
}) => {
	const { t } = useTranslation();

	return (
		<div
			className={cn(className, "flex flex-col")}
		>
			<div className="flex justify-between">
			<p className="text-lg font-display uppercase text-black flex items-center">
						<Icon
							name="Token"
							className='text-kojo mr-3'
							size={22}
						/>

					{title}
				</p>

				{connected && (
					<div className="flex space-x-2 items-center ml-4">
						<div className="relative flex">
							<span className="animate-ping absolute flex w-full h-full rounded-full bg-kojo opacity-60"></span>
							<span className="relative flex rounded-full h-2 w-2 border border-white bg-kojo"></span>
						</div>

						<p className="uppercase font-bold text-xs tracking-wider">
							{ t("settings.connected") }
						</p>
					</div>
				)}
			</div>

			<div className=" bg-border font-bold rounded-sm mt-8 px-6 py-4 flex justify-center font-text text-sm text-border-darkest">
				{ children }
			</div>

			{actionSlot && (
				<div className="mt-6 w-full">
					{ actionSlot }
				</div>
			)}
		</div>
	)
}

export default memo(SettingItem);

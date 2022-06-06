import { FunctionComponent, memo } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";
import { StatProps } from "./Stat.types";

const Stat: FunctionComponent<StatProps> = ({
	children,
	className = "",
	icon = "Hearts",
	label = "",
}) => {
	return (
		<div className={cn(className)}>
			<div className="flex items-center space-x-2 text-gray-400">
				<Icon name={icon} size={20} className="flex-shrink-0" />

				<p className="text-xs uppercase tracking-wider font-bold">
					{ label }
				</p>
			</div>

			<p className="mt-2 text-emerald-900 text-lg lg:text-xl">
				{ children }
			</p>
		</div>
	)
}

export default memo(Stat);

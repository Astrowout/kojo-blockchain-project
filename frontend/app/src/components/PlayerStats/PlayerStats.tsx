import { FunctionComponent, memo } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";
import { PlayerStatsProps } from "./PlayerStats.types";

const PlayerStats: FunctionComponent<PlayerStatsProps> = ({
	className = "",
	title = "",
	icon = "Chart",
	data = [],
}) => {
	return (
		<div className={cn(className, "bg-white rounded-2xl border-solid border-t border-emerald-600 shadow-2xl shadow-emerald-900/20 overflow-hidden")}>
			<div className="px-4 py-4 sm:px-6 text-emerald-600 bg-emerald-50 border-b border-emerald-100">
				<h3 className="text-lg leading-6 font-bold gap-x-3 flex items-center">
					{icon && (
						<Icon
							name={icon}
							size={32}
						/>
					)}

					{ title }
				</h3>
			</div>

			<dl className="divide-y">
				{data.map((item, index) => (
					<div
						key={index}
						className="px-4 py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6"
					>
						<dt className="text-gray-400">
							{ item.label }
						</dt>

						<dd className="mt-1 font-bold sm:mt-0">
							{ item.value }
						</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

export default memo(PlayerStats);

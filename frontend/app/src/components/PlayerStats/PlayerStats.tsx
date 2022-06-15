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
		<div className={cn(className, "bg-white rounded-md overflow-hidden bg-background border border-border")}>
			<div className="p-8 font-display uppercase border-b border-border text-black">
				<h3 className="text-lg leading-6 font-bold gap-x-3 flex items-center">
					{icon && (
						<Icon
							name={icon}
							className='text-kojo'
							size={22}
						/>
					)}

					{ title }
				</h3>
			</div>

			<dl className="divide-y border-0">
				{data.map((item, index) => (
					<div
						key={index}
						className="px-4 py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 font-text text-sm text-black border-0 border-border"
					>
						<dt className="border-0">
							{ item.label }
						</dt>

						<dd className="mt-1 font-bold sm:mt-0 border-0">
							{ item.value }
						</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

export default memo(PlayerStats);

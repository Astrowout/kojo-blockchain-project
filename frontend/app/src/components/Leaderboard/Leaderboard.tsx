import { FunctionComponent, memo } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import cn from "classnames";

import { LeaderboardProps } from "./Leaderboard.types";
import { truncateAddress } from "../../helpers";
import { useTranslation } from "../../hooks";

const Leaderboard: FunctionComponent<LeaderboardProps> = ({
	className = "",
	data = [],
}) => {
	const { t } = useTranslation();

	const headerCellClasses = "px-5 py-3 text-emerald-600 text-left font-semibold tracking-wider text-sm uppercase whitespace-nowrap";
	const bodyCellClasses = "px-5 py-3";

	return (
		<div className={cn(className, "overflow-auto border-solid border-t border-emerald-600 bg-white rounded-2xl shadow-2xl shadow-emerald-900/20")}>
			<table className="table-auto border-collapse w-full">
				<thead className="bg-emerald-50 border-b border-emerald-100">
					<tr>
						<th className={cn(headerCellClasses, "w-20")}>
							#
						</th>
						<th className={cn(headerCellClasses, "px-0")}></th>
						<th className={headerCellClasses}>
							{ t("leaderboard.address") }
						</th>
						<th className={headerCellClasses}>
							{ t("leaderboard.level") }
						</th>
						<th className={headerCellClasses}>
							{ t("leaderboard.xp") }
						</th>
					</tr>
				</thead>

				<tbody>
					{data.map((item, index) => (
						<tr
							key={index}
							className="even:bg-gray-50"
						>
							<td className={cn(bodyCellClasses, "font-bold")}>
								{ index + 1 }
							</td>
							<td className={cn(bodyCellClasses, "px-0")}>
								<span className="flex">
									<Jazzicon
										diameter={36}
										seed={jsNumberForAddress(item.address)}
									/>
								</span>
							</td>
							<td className={bodyCellClasses}>
								{ truncateAddress(item.address) }
							</td>
							<td className={bodyCellClasses}>
								{ item.level }
							</td>
							<td className={bodyCellClasses}>
								{ item.experiencePoints }
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default memo(Leaderboard);

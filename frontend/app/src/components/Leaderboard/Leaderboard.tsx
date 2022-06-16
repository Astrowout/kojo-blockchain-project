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

	const headerCellClasses = "px-5 py-3 text-black text-left tracking-wider text-xs uppercase whitespace-nowrap";
	const bodyCellClasses = "px-5 py-3 font-text text-xs";

	return (
		<div className={cn(className, "overflow-auto border-solid bg-background rounded-md border border-border")}>
			<table className="table-auto border-collapse w-full">
				<thead className="border-b bg-border">
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
							className="even:bg border-t border-border"
						>
							<td className={cn(bodyCellClasses, "font-title text-xs")}>
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

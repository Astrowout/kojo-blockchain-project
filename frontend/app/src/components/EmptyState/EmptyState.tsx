import { FC, memo } from "react";
import cn from "classnames";

import { EmptyStateProps } from "./EmptyState.types";
import Icon from "../Icon/Icon";

const EmptyState: FC<EmptyStateProps> = ({
	children,
	className = "",
	message = "",
	compact = false,
	icon = "ArrowRight",
}) => {
	return (
		<div
			className={cn(className, "flex items-center w-full", {
				"flex-col justify-center u-card": !compact,
				"text-center sm:text-left flex-col sm:flex-row gap-y-4 gap-x-6 justify-between u-card-mobile": compact,
			})}
		>
			{!compact && (
				<Icon
					name={icon}
					className="text-gray-400 flex-shrink-0"
					size={64}
				/>
			)}

			<p
				className={cn("text-gray-600 max-w-prose", {
					"mt-2 text-center": !compact,
				})}
			>
				{ message }
			</p>

			{children && (
				<div
					className={cn({
						"mt-6": !compact,
					})}
				>
					{ children }
				</div>
			)}
		</div>
	)
}

export default memo(EmptyState);

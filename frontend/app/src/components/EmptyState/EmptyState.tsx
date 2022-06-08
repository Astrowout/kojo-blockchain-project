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
				"flex-row justify-between u-card-mobile": compact,
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
						"ml-6": compact,
					})}
				>
					{ children }
				</div>
			)}
		</div>
	)
}

export default memo(EmptyState);

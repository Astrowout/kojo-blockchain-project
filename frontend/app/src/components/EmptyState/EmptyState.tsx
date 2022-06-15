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
			// className={cn(className, "flex items-center w-full bg-background", {
			// 	"flex-col justify-center u-card": !compact,
			// 	"text-center sm:text-left flex-col sm:flex-row gap-y-4 gap-x-6 justify-between u-card-mobile": compact,
			// })}
			className={cn('bg-background p-8 border border-border rounded-md flex flex-col items-center justify-center', className)}
		>
			{!compact && (
				<Icon
					name={icon}
					className="text-border flex-shrink-0 mb-2 mt-2"
					size={48}
				/>
			)}

			<p
				className={cn("text-gray-600 max-w-prose font-text text-xs", {
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

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
			className={cn('bg-background p-8 border border-border rounded-md flex flex-col items-center justify-center', className)}
		>
			{!compact && (
				<Icon
					name={icon}
					className="text-border-dark flex-shrink-0 mb-2 mt-2"
					size={48}
				/>
			)}

			<p
				className={cn("text-gray-600 max-w-prose font-text text-xs text-center", {
					"mt-2": !compact,
				})}
			>
				{ message }
			</p>

			{children && (
				<div
					className={cn({
						"mt-4": compact,
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

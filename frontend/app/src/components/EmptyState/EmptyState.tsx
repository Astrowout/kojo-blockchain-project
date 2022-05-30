import { FC, memo } from "react";
import cn from "classnames";

import { EmptyStateProps } from "./EmptyState.types";
import Icon from "../Icon/Icon";

const EmptyState: FC<EmptyStateProps> = ({
	children,
	className = "",
	message = "",
	icon = "ArrowRight",
}) => {
	return (
		<div
			className={cn(className, "flex flex-col items-center justify-center w-full u-card")}
		>
			<Icon
				name={icon}
				className="text-gray-400"
				size={64}
			/>

			<p className="mt-3 text-gray-600 text-center max-w-prose">
				{ message }
			</p>

			{children && (
				<div className="mt-6">
					{ children }
				</div>
			)}
		</div>
	)
}

export default memo(EmptyState);

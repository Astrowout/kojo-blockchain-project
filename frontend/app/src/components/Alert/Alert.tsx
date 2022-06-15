import { FunctionComponent, memo } from "react";
import cn from "classnames";

import { AlertProps, AlertType } from "./Alert.types";
import Icon from "../Icon/Icon";

const Alert: FunctionComponent<AlertProps> = ({
	children,
	icon = null,
	type = AlertType.DANGER,
	className = "",
}) => {
	return (
		<div
			className={cn(className, "bg-red-900 font-text text-xs text-background flex items-center px-4 py-8 sm:px-6 max-w-prose rounded-md overflow-hidden shadow-xl", {
				'shadow-red-500/10 border-t text-red-00': type === AlertType.DANGER,
			})}
		>
			{icon && (
				<Icon
					className="flex-shrink-0 mr-4"
					size={28}
					name={icon}
				/>
			)}

			{ children }
		</div>
	)
}

export default memo(Alert);

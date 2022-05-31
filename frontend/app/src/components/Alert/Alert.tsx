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
			className={cn(className, "bg-white flex items-center px-4 py-8 sm:px-6 max-w-prose rounded-2xl overflow-hidden shadow-xl", {
				'shadow-red-500/10 border-t border-red-500 text-red-600': type === AlertType.DANGER,
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

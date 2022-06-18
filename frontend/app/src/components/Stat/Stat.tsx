import { FunctionComponent, memo } from "react";
import cn from "classnames";

// import Icon from "../Icon/Icon";
// import { StatProps } from "./Stat.types";

const Stat: FunctionComponent<any> = ({
	children,
	className = "",
	// icon = "Hearts",
	label = "",
}) => {
	return (
		<div className={cn(className)}>
			<div className="space-x-1.5 flex justify-between item-center">
				{/* <Icon name={icon} size={20} className="flex-shrink-0" /> */}

				<p className="font-sans uppercase text-xs text-black">
					{ label }
				</p>

				<p className="font-text text-xs text-black">
				{ children }
				</p>
			</div>


		</div>
	)
}

export default memo(Stat);

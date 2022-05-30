import { FunctionComponent, memo } from "react";
import cn from "classnames";

import { ChartProps } from "./Chart.types";

const Chart: FunctionComponent<ChartProps> = ({
	children,
	className = "",
	progress = 50,
	strokeWidth = 6,
	size = 200,
}) => {
	return (
		<div
			className={cn(className, "relative flex flex-col items-center justify-center")}
			style={{
				width: size,
				height: size,
			}}
		>
			<span className="text-4xl font-bold mt-4">
				{ progress }%
			</span>

			{!!children && (
				<div className="mt-2">
					{ children }
				</div>
			)}

			<svg className="absolute inset-0 block w-full h-full shadow-xl shadow-emerald-600/10 rounded-full" viewBox="0 0 100 100" fill="none" strokeLinecap="round" strokeWidth={strokeWidth}>
				<circle
					className="text-gray-200 shadow-inner"
					cx="50"
					cy="50"
					r={50 - (strokeWidth / 2)}
					stroke="currentColor"
				></circle>

				<circle
					className="text-emerald-600 transition-all duration-1000 -rotate-90 origin-center"
					pathLength="100"
					strokeDasharray="100"
					cx="50"
					cy="50"
					r={50 - (strokeWidth / 2)}
					stroke="currentColor"
					strokeDashoffset={100 - progress}
				></circle>
			</svg>
		</div>
	)
}

export default memo(Chart);

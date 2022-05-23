import { FC, memo } from "react";
import cn from "classnames";

import { NotificationItemProps } from "./NotificationItem.types";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

const NotificationItem: FC<NotificationItemProps> = ({
	message = "",
	url = "",
	date = new Date(),
	read = false,
	className,
}) => {
	return (
		<Link
			to={url}
			className={cn(className, "flex justify-between items-center w-full px-6 py-4 hover:bg-emerald-50 transition-colors")}
		>
			<span className="flex flex-col">
				<p
					className={cn("md:text-lg", {
						"font-bold": !read
					})}
				>
					{read && (
						<span className="relative flex rounded-full h-2 w-2 mr-2 border border-white bg-red-500"></span>
					)}

					<span>
						{ message }
					</span>
				</p>

				<p className="text-gray-400 text-sm mt-1">
					{ date.toDateString() }
				</p>
			</span>

			{!read && (
				<Icon
					name="ArrowRight"
					className="ml-4 text-gray-400"
					size={20}
				/>
			)}
		</Link>
	)
}

export default memo(NotificationItem);

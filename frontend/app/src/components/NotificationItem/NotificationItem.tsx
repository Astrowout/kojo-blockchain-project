import { FC, memo } from "react";
import cn from "classnames";
import { formatDistanceToNow } from "date-fns";

import { NotificationItemProps } from "./NotificationItem.types";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

const NotificationItem: FC<NotificationItemProps> = ({
	id = "",
	message = "",
	url = "",
	date = new Date(),
	read = false,
	className,
}) => {
	const renderRelativeDate = () => {
		return formatDistanceToNow(new Date(date), {
			addSuffix: true,
		});
	}

	const classNames = cn(className, "flex justify-between group items-center w-full px-6 py-4 transition-colors hover:bg-border cursor-pointer");

	const renderContent = () => (
		<>
			<div className="flex flex-col">
				<p
					className={cn("", {
						"font-bold": !read
					})}
				>
					{!read && (
						<span className="inline-block mt-2 md:mt-2.5 rounded-full h-2 w-2 mr-1.5 border bg-kojo"></span>
					)}

					<span className="font-text text-sm text-black">
						{ message }
					</span>
				</p>

				<p className="text-black italic text-xs font-text mt-1">
					{ renderRelativeDate() }
				</p>
			</div>

			{url && (
				<Icon
					name="ArrowRight"
					className="ml-4 text-black group-hover:text-kojo"
					size={20}
				/>
			)}
		</>
	);

	return url ? (
		<Link
			to={url}
			className={classNames}
		>
			{ renderContent() }
		</Link>
	) : (
		<div className={classNames}>
			{ renderContent() }
		</div>
	)
}

export default memo(NotificationItem);

import { useContext } from "react";
import {
	Layout,
	Link,
	NotificationItem,
} from "../../components";
import { SessionContext } from "../../context";
import { useTranslation } from "../../hooks";

const NotificationsPage = () => {
	const { t } = useTranslation();
	const {
		user,
	} = useContext(SessionContext);

	return (
		<Layout
			title={t("notifications.title")}
			description={user ? t("notifications.description.1", t("notifications.description.2", <b className="font-bold">{user}</b>)) : null}
			backLink
			withOverlap={false}
		>
			<div className="flex flex-col max-w-prose flex-grow">
				<Link
					className="ml-auto mb-4"
					light
				>
					{ t("notifications.markAsRead") }
				</Link>

				<ul className="w-full divide-y u-card-fluid">
					<li>
						<NotificationItem
							message={"test"}
							date={new Date()}
						/>
					</li>
					<li>
						<NotificationItem
							message={"test"}
							date={new Date()}
						/>
					</li>
				</ul>
			</div>
		</Layout>
	)
}

export default NotificationsPage;

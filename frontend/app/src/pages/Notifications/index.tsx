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
		notifications,
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
					className="ml-auto mb-6 md:mb-4"
					light
				>
					{ t("notifications.markAsRead") }
				</Link>

				<ul className="divide-y u-card-fluid -mx-4 sm:-mx-8 md:mx-0 border-y md:border-none">
					{notifications?.map((notification) => (
						<li key={notification.id}>
							<NotificationItem
								message={notification.message}
								date={notification.createdAt}
								read={notification.read}
							/>
						</li>
					))}
				</ul>
			</div>
		</Layout>
	)
}

export default NotificationsPage;

import { useContext } from "react";
import {
	EmptyState,
	Layout,
	Link,
	NotificationItem,
} from "../../components";
import { SessionContext } from "../../context";
import { useTranslation } from "../../hooks";

const NotificationsPage = () => {
	const { t } = useTranslation();
	const {
		notifications,
		markAllAsRead,
	} = useContext(SessionContext);

	const totalUnread = notifications?.reduce((prevValue, currentValue) => !currentValue.read ? prevValue += 1 : prevValue, 0);

	return (
		<Layout
			title={t("notifications.title")}
			description={ t("notifications.description.1", t("notifications.description.2", <b className="font-bold">{totalUnread}</b>))}
			backLink
			withOverlap={false}
		>
			<div className="flex flex-col max-w-prose flex-grow">
				{notifications && !!notifications.length ? (
					<>
						{(totalUnread && totalUnread > 0) ? (
							<Link
								className="ml-auto mb-6 md:mb-4"
								light
								onClick={markAllAsRead}
							>
								{ t("notifications.markAsRead") }
							</Link>
						) : ''}

						<ul className="divide-y u-card-fluid -mx-4 sm:-mx-8 md:mx-0 border-y md:border-none">
							{notifications?.map((notification) => (
								<li key={notification.id}>
									<NotificationItem
										id={notification.id}
										message={notification.message}
										date={notification.createdAt}
										read={notification.read}
										url={notification.url}
									/>
								</li>
							))}
						</ul>
					</>
				) : (
					<EmptyState
						message={t("notifications.empty")}
						icon="Bell"
					/>
				)}
			</div>
		</Layout>
	)
}

export default NotificationsPage;

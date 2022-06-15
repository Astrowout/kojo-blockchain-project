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
		loading,
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
			className="mt-0"
		>
			<div className="flex flex-col max-w-prose flex-grow">
				{notifications && !!notifications.length ? (
					<>
						{(totalUnread && totalUnread > 0) ? (
							<Link
								className="ml-auto mb-6 md:mb-4 mt-6 md:mt-0"
								light
								loading={loading}
								onClick={markAllAsRead}
							>
								{ t("notifications.markAsRead") }
							</Link>
						) : ''}

						<ul className="divide-y u-card overflow-hidden md:p-0 -mx-4 sm:-mx-8 md:mx-0 border-y md:border-none">
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
						className="w-full min-h-[30rem]"
					/>
				)}
			</div>
		</Layout>
	)
}

export default NotificationsPage;

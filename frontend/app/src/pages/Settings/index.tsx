import { useContext } from "react";
import {
	Button,
	ButtonContext,
	Icon,
	Layout, SettingItem,
} from "../../components";
import { AuthContext } from "../../context";
import { truncateAddress } from "../../helpers";
import { useTranslation } from "../../hooks";

const SettingsPage = () => {
	const { t } = useTranslation();
	const { address, disconnect } = useContext(AuthContext);

	return (
		<Layout
			title={t("settings.title")}
			description={t("dashboard.description.1", <b className="font-semibold">{t("dashboard.description.2")}</b>)}
			backLink
			withOverlap={false}
		>
			<div className="flex flex-col justify-between items-center flex-grow pb-40">
				<div className="grid xl:grid-cols-2 gap-8 w-full">
					{address && (
						<SettingItem
							title={t("settings.wallet")}
							className="u-card"
						>
							{ truncateAddress(address) }
						</SettingItem>
					)}

					<SettingItem
						title={t("settings.waterMeter")}
						className="u-card"
					>
						<div className="flex items-center space-x-4">
							<Icon
								name="Meter"
								size={24}
							/>
							<span>
								Shayp POLY4
							</span>
						</div>
					</SettingItem>
				</div>

				<Button
					context={ButtonContext.DANGER}
					onClick={disconnect}
					icon="Logout"
					compact
					className="my-12 absolute bottom-0"
				>
					{ t("settings.disconnect") }
				</Button>
			</div>
		</Layout>
	)
}

export default SettingsPage;

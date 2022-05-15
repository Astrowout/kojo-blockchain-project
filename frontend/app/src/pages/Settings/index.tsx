import { useContext } from "react";
import {
	Button,
	ButtonContext,
	Footer,
	Icon,
	Layout, SettingItem,
} from "../../components";
import { GlobalContext } from "../../context";
import { truncateAddress } from "../../helpers";
import { useTranslation } from "../../hooks";

const SettingsPage = () => {
	const { t } = useTranslation();
	const {
		address,
		network,
		disconnect,
	} = useContext(GlobalContext);

	return (
		<Layout
			title={t("settings.title")}
			description={t("dashboard.description.1", <b className="font-semibold">{t("dashboard.description.2")}</b>)}
			backLink
			withOverlap={false}
		>
			<div className="flex flex-col justify-between items-center flex-grow pb-8">
				<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
					{address && (
						<SettingItem
							title={t("settings.wallet")}
							className="u-card"
							actionSlot={
								<Button
									context={ButtonContext.DANGER}
									onClick={disconnect}
									icon="Logout"
									compact
									fluid
								>
									{ t("settings.disconnect") }
								</Button>
							}
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

					{network && (
						<SettingItem
							title={t("settings.network")}
							className="u-card"
							connected={false}
						>
							{ network.name }
						</SettingItem>
					)}
				</div>

				<Footer
					version={process.env.REACT_APP_VERSION!}
					className="mt-20"
				/>
			</div>
		</Layout>
	)
}

export default SettingsPage;

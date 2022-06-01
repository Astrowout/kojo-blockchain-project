import { useIonToast } from "@ionic/react";
import { useContext } from "react";
import {
	About,
	Button,
	ButtonContext,
	Footer,
	Icon,
	Layout,
	Link,
	SettingItem,
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
	const [present] = useIonToast();


	const handleCopyAddress = () => {
		navigator.clipboard.writeText(address!);

		present({
			color: "secondary",
			duration: 3000,
			position: "top",
			message: t("settings.copySuccess") as unknown as string,
		});
	}

	return (
		<Layout
			title={t("settings.title")}
			description={network ? t("network.connection", <b className="font-mono bg-emerald-900 rounded px-1.5 py-0.5">{network.name}</b>) : null}
			backLink
			withOverlap={false}
		>
			<div className="flex flex-col justify-between items-center flex-grow">
				<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
					{address && (
						<SettingItem
							title={t("settings.wallet")}
							className="u-card"
							actionSlot={
								<div className="flex flex-col space-y-8">
									<Link
									 	onClick={handleCopyAddress}
										className="mx-auto"
										icon="Clipboard"
									>
										{t("settings.copy")}
									</Link>

									<Button
										context={ButtonContext.DANGER}
										onClick={disconnect}
										icon="Logout"
										compact
										fluid
									>
										{ t("settings.disconnect") }
									</Button>
								</div>
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

					<About className="xl:col-span-2" />
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

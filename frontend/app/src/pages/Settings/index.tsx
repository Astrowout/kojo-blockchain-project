import { useContext } from "react";
import { Clipboard } from '@capacitor/clipboard';
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

	const handleCopyAddress = async () => {
		await Clipboard.write({
		  	string: address!,
		});
	}

	return (
		<Layout
			title={t("settings.title")}
			description={network ? t("network.connection", <b className="font-mono bg-emerald-900 rounded px-1.5 py-0.5">{network.name}</b>) : null}
			backLink
		>
			<div className="flex flex-col justify-between items-center flex-grow">
				<div className="grid xl:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-12 w-full">
					<div className="xl:col-span-2 u-card-mobile flex justify-center space-x-3">
						<Icon
							name="Danger"
							size={24}
							className="flex-shrink-0"
						/>

						<p>
							{ t("general.testnet",
								<a
									href="https://faucet.polygon.technology/"
									target="_blank"
									rel="noopener noreferrer"
									className="underline"
								>
									{ t("general.faucet") }
								</a>
							) }
						</p>
					</div>

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
										tooltip={t("settings.copySuccess")}
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

import { useContext } from "react";
import { Clipboard } from '@capacitor/clipboard';
import {
	About,
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
	} = useContext(GlobalContext);

	const handleCopyAddress = async () => {
		await Clipboard.write({
		  	string: address!,
		});
	}

	return (
		<Layout
			title={t("settings.title")}
			description={network ? t("network.connection", <b className="font-mono bg-border rounded px-1.5 py-0.5">{network.name}</b>) : null}
			backLink
		>
			<div className="flex flex-col justify-between items-center flex-grow mt-5">
				<div className="grid xl:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-7 w-full">
					<div className="xl:col-span-2 flex justify-between space-x-3 bg-black p-6 rounded-md items-center">
						<div className="flex items-center">
						<Icon
							name="Danger"
							size={18}
							className="flex-shrink-0 mr-3 text-background"
						/>

						<p className="flex items-center font-text text-xs text-background">
							{ t("general.testnet",

							) }
						</p>
						</div>

								<a
									href="https://faucet.polygon.technology/"
									target="_blank"
									rel="noopener noreferrer"
									className="font-title uppercase text-kojo-light text-xs  min-w-[9em]"
								>
									{ t("general.faucet") }
								</a>
					</div>

					{address && (
						<SettingItem
							title={t("settings.wallet")}
							className="bg-background p-5 border border-border rounded-md"
							actionSlot={
								<div className="flex flex-col space-y-8">
									<Link
									 	onClick={handleCopyAddress}
										className="mx-auto text-xs font-title uppercase text-kojo mb-4"
										icon="Clipboard"
										tooltip={t("settings.copySuccess")}
									>
										{t("settings.copy")}
									</Link>
								</div>
							}
						>
							{ truncateAddress(address) }
						</SettingItem>
					)}

					<SettingItem
						title={t("settings.waterMeter")}
						className="bg-background p-5 border border-border rounded-md"
					>
						<div className="flex items-center space-x-4">
							<Icon
								name="Meter"
								size={18}
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
					className="mt-10"
				/>
			</div>
		</Layout>
	)
}

export default SettingsPage;

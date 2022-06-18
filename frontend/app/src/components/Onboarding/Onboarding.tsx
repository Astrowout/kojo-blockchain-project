import { FC, memo, useState } from "react";
import cn from "classnames";

import { OnboardingProps } from "./Onboarding.types";
import { useTranslation } from "../../hooks";
import {
	Logo,
	Button,
} from "../../components";
import ConnectModal from "../ConnectModal/ConnectModal";
import { useIonViewWillLeave } from "@ionic/react";

const Onboarding: FC<OnboardingProps> = ({ className }) => {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useIonViewWillLeave(() => {
		setIsModalOpen(false);
	});

	const close = () => {
		setIsModalOpen(false);
	}


	return (
		<section
			className={cn(
				className,
				"px-6 sm:px-10 sm:py-4 flex items-center"
			)}
		>
			<div className="px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center text-center text-white max-w-md rounded-md border bg-background border-border sm:text-emerald-900">
				<Logo w={120} />

				<p className=" font-text text-sm text-black mt-6">
					{ t(
						"onboarding.description.1",
						<b className="font-bold">{ t("onboarding.description.2") }</b>,
						<b className="font-bold">{ t("onboarding.description.3") }</b>,
					) }
				</p>

				<Button
					className="mt-10"
					fluid
					onClick={() => setIsModalOpen(true)}
				>
					{ t("onboarding.cta") }
				</Button>
			</div>

			<ConnectModal
				title={t("connect.title")}
				description={t("connect.description")}
				close={close}
				isOpen={isModalOpen}
			/>
		</section>
	)
}

export default memo(Onboarding);

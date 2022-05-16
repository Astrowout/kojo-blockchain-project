import { FC, useState } from "react";
import cn from "classnames";

import { OnboardingProps } from "./Onboarding.types";
import { useTranslation } from "../../hooks";
import {
	Logo,
	Button,
} from "../../components";
import ConnectModal from "../ConnectModal/ConnectModal";
import { ButtonContext } from "../Button/Button.types";
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
				"px-6 sm:px-10 sm:py-4 flex items-end mt-auto sm:mb-auto"
			)}
		>
			<div className="sm:px-10 py-12 sm:py-10 flex flex-col items-center text-center text-white max-w-md rounded-2xl sm:border sm:bg-white sm:text-emerald-900">
				<Logo w={96} blank className="sm:hidden text-white" />
				<Logo w={120} className="hidden sm:block" />

				<h1 className="text-lg mt-10 sm:mt-14 font-semibold uppercase tracking-wider">
					{ t("onboarding.title") }
				</h1>

				<p className="mt-3">
					{ t(
						"onboarding.description.1",
						<b className="font-semibold">{ t("onboarding.description.2") }</b>,
						<b className="font-semibold">{ t("onboarding.description.3") }</b>,
					) }
				</p>

				<Button
					className="mt-12 sm:hidden"
					fluid
					context={ButtonContext.ALT}
					onClick={() => setIsModalOpen(true)}
				>
					{ t("onboarding.cta") }
				</Button>

				<Button
					className="mt-10 hidden sm:flex"
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

export default Onboarding;

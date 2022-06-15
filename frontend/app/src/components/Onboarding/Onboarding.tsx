import { FC, memo, useState } from "react";
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
			<div className="sm:px-10 py-12 sm:py-10 flex flex-col items-center text-center text-white max-w-md rounded-md border bg-background border-border sm:text-emerald-900">
				{/* <Logo w={96} blank className="sm:hidden text-white" />
				<Logo w={120} className="hidden sm:block" /> */}

						<div className="flex items-center">
						<Logo w={132} />
						<p className="font-display uppercase text-4xl -ml-16 text-black">Kōjō</p>
					</div>


				{/* <h1 className="text-lg mt-10 sm:mt-14 font-bold uppercase tracking-wider">
					{ t("onboarding.title") }
				</h1> */}

				<p className=" font-text text-sm text-black mt-6">
					{ t(
						"onboarding.description.1",
						<b className="font-bold">{ t("onboarding.description.2") }</b>,
						<b className="font-bold">{ t("onboarding.description.3") }</b>,
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

export default memo(Onboarding);

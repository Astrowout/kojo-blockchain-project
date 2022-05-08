import { FunctionComponent } from "react";
import cn from "classnames";

import { OnboardingProps } from "./Onboarding.types";
import { useTranslation, useWallet } from "@/hooks";
import {
	Logo,
	Button,
} from "@/components";

const Onboarding: FunctionComponent<OnboardingProps> = ({ className }) => {
	const { t } = useTranslation();
	const { handleConnect, isLoading } = useWallet();

	return (
		<section className={cn(className, "px-6 sm:px-10 py-12 mx-auto flex flex-col items-center text-center text-white max-w-prose")}>
				<Logo w={80} url="/" white />

				<h1 className="text-lg mt-10 font-semibold uppercase tracking-wider">
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
					alt
					className="mt-12"
					fluid
					loading={isLoading}
					onClick={handleConnect}
				>
					{ t("onboarding.cta") }
				</Button>
		</section>
	)
}

export default Onboarding;

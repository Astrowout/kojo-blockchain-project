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
		<section
			className={cn(
				className,
				"px-6 sm:px-10 sm:py-4 flex items-end mt-auto sm:mb-auto"
			)}
		>
			<div className="sm:px-10 py-12 sm:py-10 flex flex-col items-center text-center text-white max-w-md rounded-2xl sm:border sm:bg-white sm:text-emerald-900">
				<Logo w={80} white className="sm:hidden" />
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
					alt
					className="mt-12 sm:hidden"
					fluid
					loading={isLoading}
					onClick={handleConnect}
				>
					{ t("onboarding.cta") }
				</Button>
				<Button
					className="mt-10 hidden sm:block"
					fluid
					loading={isLoading}
					onClick={handleConnect}
				>
					{ t("onboarding.cta") }
				</Button>
			</div>
		</section>
	)
}

export default Onboarding;

import { FunctionComponent, memo } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";
import { ClaimProps } from "./Claim.types";
import { useTranslation } from "../../hooks";

const Claim: FunctionComponent<ClaimProps> = ({
	className = "",
	amount = 0,
}) => {
	const { t } = useTranslation();

	return (
		<div className={cn(className, "bg-white rounded-2xl flex flex-col items-center w-full relative px-5 py-12 overflow-hidden shadow-2xl shadow-emerald-900/20")}>
			<Icon name="Token" size={160} className="absolute -right-10 -bottom-8 text-emerald-900 opacity-10" />

			<p className="text-lg text-center">
				{ t("claim.amount") }
			</p>

			<p className="flex items-center space-x-2 mt-3">
				<span className="font-bold text-5xl lg:text-6xl">
					{ amount }
				</span>

				<Icon name="Token" size={36} className="text-emerald-600 mt-1" />
			</p>
		</div>
	)
}

export default memo(Claim);

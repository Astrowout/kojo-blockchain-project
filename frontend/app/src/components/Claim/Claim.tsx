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
		<div className={cn(className, "bg-background rounded-md flex flex-col items-center w-full relative px-5 py-12 overflow-hidden border border-border")}>
			<Icon name="Token" size={160} className="absolute -right-10 -bottom-8 text-border" />

			<p className=" text-center font-title text-xs uppercase text-black">
				{ t("claim.amount") }
			</p>

			<p className="flex items-center space-x-2 mt-3">
				<span className="font-bold text-2xl lg:text-3xl font-text text-black">
					$KOJO { amount }
				</span>

				{/* <Icon name="Token" size={36} className="text-emerald-600 mt-1" /> */}
			</p>
		</div>
	)
}

export default memo(Claim);

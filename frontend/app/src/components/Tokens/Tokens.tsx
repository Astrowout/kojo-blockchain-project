import { FunctionComponent, memo, useContext } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";
import { TokensProps } from "./Tokens.types";
import { useTranslation } from "../../hooks";
import Link from "../Link/Link";
import { SessionContext } from "../../context";

const Tokens: FunctionComponent<TokensProps> = ({
	compact = true,
	className,
}) => {
	const { t } = useTranslation();
	const {
		balance,
		nextClaimInterval,
	} = useContext(SessionContext);

	return (
		<div className={cn(className, "flex flex-col bg-white rounded-md overflow-hidden border border-border bg-background")}>
			<div className="overflow-hidden p-8 relative h-full">
				{/* <Icon
					name="Token"
					size={160}
					className="absolute -right-10 -bottom-8 text-emerald-900 opacity-10"
				/> */}

				<div className="flex w-full justify-between items-center">
				<p className="text-xl font-display uppercase text-black">
					Balance
				</p>

				<p className="flex items-center space-x-2">
					<span className="font-bold text-2xl font-text text-black">
						{ balance }
					</span>

					<p className="font-text text-black">$KOJO</p>

					{/* <Icon
						name="Token"
						size={32}
						className="text-emerald-600 mt-1"
					/> */}
				</p>
				</div>




			</div>

			{!compact && (
				<div className="border-t border-border p-8 text-black font-text">
					<p className="text-sm">
						{ t("tokens.nextClaim") }
					</p>

					<p className="mt-1 font-bold text-xl lg:text-2xl">
						{ nextClaimInterval || t("tokens.nextClaimEmpty") }
					</p>

					<p className="text-xs italic mt-6 text-border flex items-center space-x-1">
						<Icon
							name="Danger"
							size={14}
						/>

						<span className="mt-[1px]">
							{ t("tokens.disclaimer") }
						</span>
					</p>

					{!compact && (
					<Link className="mt-4" url="/claim">
						{ t("tokens.claim") }
					</Link>
				)}
				</div>
			)}
		</div>
	)
}

export default memo(Tokens);

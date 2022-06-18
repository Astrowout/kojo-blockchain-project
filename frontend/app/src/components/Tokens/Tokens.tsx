import { FunctionComponent, memo, useContext } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";
import { useTranslation } from "../../hooks";
import Link from "../Link/Link";
import { SessionContext } from "../../context";

const Tokens: FunctionComponent<any> = ({
	compact = true,
	className,
	icon = "Chart"
}) => {
	const { t } = useTranslation();
	const {
		balance,
		nextClaimInterval,
	} = useContext(SessionContext);

	return (
		<div className={cn(className, "flex flex-col rounded-md overflow-hidden border border-border bg-background")}>
			<div className="overflow-hidden p-4 sm:p-8 relative">
				<div className="flex w-full justify-between items-center">
					<p className="text-lg font-display uppercase text-black flex items-center">
						{icon && (
							<Icon
								name="Token"
								className='text-kojo mr-3'
								size={24}
							/>
						)}

						{ t("tokens.balance") }
					</p>

					<p className="flex items-center space-x-2 text-lg font-text text-black">
						{ balance } $KOJO
					</p>
				</div>
			</div>

			{!compact && (
				<div className="border-t border-border p-4 sm:p-8 text-black font-text">
					<div className="flex items-center justify-between">
						<p className="text-sm leading-6">
							{ t("tokens.nextClaim") } <span className="font-bold">{ nextClaimInterval || t("tokens.nextClaimEmpty") }</span>*
						</p>

						{!compact && (
							<Link className="text-sm font-sans uppercase text-kojo ml-7" url="/claim">
								{ t("tokens.claim") }
							</Link>
						)}
					</div>

					<p className="mt-6 text-xs italic leading-1">
						*{ t("tokens.disclaimer") }
					</p>
				</div>
			)}
		</div>
	)
}

export default memo(Tokens);

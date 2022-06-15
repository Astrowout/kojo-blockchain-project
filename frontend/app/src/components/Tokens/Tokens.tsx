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
			<div className="overflow-hidden p-8 relative">
				{/* <Icon
					name="Token"
					size={160}
					className="absolute -right-10 -bottom-8 text-emerald-900 opacity-10"
				/> */}

				<div className="flex w-full justify-between items-center">
				<p className="text-lg font-display uppercase text-black flex items-center">
					{icon && (
						<Icon
							name="Token"
							className='text-kojo mr-3'
							size={22}
						/>
					)}

					Balance
				</p>

				<p className="flex items-center space-x-2">
					<span className="text-lg font-text text-black">
						{ balance } $KOJO
					</span>

					{/* <Icon
						name="Token"
						size={32}
						className="text-emerald-600 mt-1"
					/> */}
				</p>
				</div>




			</div>

			{!compact && (
				<div className="border-t border-border p-8 text-black font-text flex items-center justify-between">
					<div className="">
					<p className="text-xs leading-6">{ t("tokens.nextClaim") } <span className="font-bold">{ nextClaimInterval || t("tokens.nextClaimEmpty") }</span>.</p>
					<span className="mt-[1px] text-xs italic leading-1">
							{ t("tokens.disclaimer") }
					</span>
					</div>

					{!compact && (
					<Link className="text-xs font-title uppercase text-kojo pl-7" url="/claim">
						{ t("tokens.claim") }
					</Link>
					)}

					{/* <p className="mt-1 font-bold text-xl lg:text-2xl">

					</p> */}
					{/* <p className="text-sm">
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
					)} */}
				</div>
			)}
		</div>
	)
}

export default memo(Tokens);

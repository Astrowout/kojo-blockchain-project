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
		minsUntilNextClaim,
	} = useContext(SessionContext);

	return (
		<div className={cn(className, "bg-white rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20")}>
			<div className="overflow-hidden p-6 relative">
				<Icon
					name="Token"
					size={160}
					className="absolute -right-10 -bottom-8 text-emerald-900 opacity-10"
				/>

				<p className="text-xl">
					{ t("tokens.title") }
				</p>

				<p className="flex items-center space-x-2 mt-3">
					<span className="font-bold text-4xl lg:text-5xl">
						{ balance }
					</span>

					<Icon
						name="Token"
						size={32}
						className="text-emerald-600 mt-1"
					/>
				</p>

				{!compact && (
					<Link className="mt-4" url="/claim">
						{ t("tokens.claim") }
					</Link>
				)}
			</div>

			{!compact && (
				<div className="border-t p-6 text-gray-400">
					<p className="lg:text-lg">
						{ t("tokens.nextClaim") }
					</p>

					<p className="mt-1 font-bold text-xl lg:text-2xl text-emerald-600">
						{ t("tokens.minutes", minsUntilNextClaim) }
					</p>

					<p className="text-xs italic mt-6 text-gray-600 flex items-center space-x-1">
						<Icon
							name="Danger"
							size={14}
						/>

						<span className="mt-[1px]">
							{ t("tokens.disclaimer") }
						</span>
					</p>
				</div>
			)}
		</div>
	)
}

export default memo(Tokens);

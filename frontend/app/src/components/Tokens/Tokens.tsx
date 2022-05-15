import { FunctionComponent, memo } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";
import { TokensProps } from "./Tokens.types";
import { useTranslation } from "../../hooks";
import Link from "../Link/Link";

const Tokens: FunctionComponent<TokensProps> = ({
	compact = true,
	className,
}) => {
	const { t } = useTranslation();
	const amount = 567;
	const days = 17;

	return (
		<div className={cn(className, "bg-white rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20")}>
			<div className="overflow-hidden p-6 relative">
				<Icon name="Token" size={160} className="absolute -right-10 -bottom-8 text-emerald-900 opacity-10" />

				<p className="text-xl">
					{ t("tokens.title") }
				</p>

				<p className="flex items-center space-x-3 mt-3">
					<span className="font-bold text-4xl lg:text-5xl">
						{ amount }
					</span>

					<Icon name="Token" size={32} className="text-emerald-600" />
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

					<p className="mt-1 font-semibold text-xl lg:text-2xl">
						{ t("tokens.days", days) }
					</p>
				</div>
			)}
		</div>
	)
}

export default memo(Tokens);

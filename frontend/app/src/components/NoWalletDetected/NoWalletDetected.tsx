import { FC } from "react";

import Icon from "../Icon/Icon";
import { useTranslation } from "../../hooks";

const NoWalletDetected: FC = () => {
	const { t } = useTranslation();

	return (
		<div className="container">
			<div className="max-w-prose p-4 text-center space-y-4">
				<Icon name="EmptyWallet" size={48} />

				<p>{t("errors.noWallet",
					<a
						href="http://metamask.io"
						target="_blank"
						rel="noopener noreferrer"
					>
						MetaMask
					</a>
				)}
				</p>
			</div>
	  	</div>
	)
}

export default NoWalletDetected;

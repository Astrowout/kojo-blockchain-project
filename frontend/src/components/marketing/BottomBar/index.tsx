import { FunctionComponent } from 'react';
import Image from "next/image";
import cn from "classnames";

import { BottomBarProps } from "./types";
import { useTranslation } from "@/hooks";
import {
	Button,
	Link,
	Icon,
} from '@/components';

const BottomBar: FunctionComponent<BottomBarProps> = ({ className, domain = "" }) => {
	const { t } = useTranslation();

	return (
		<div className={cn(className, 'border-t py-8 md:py-4 flex flex-col space-y-4 lg:space-y-0 lg:flex-row items-center justify-between')}>
			<div className="flex items-center divide-x">
				<p className="text-gray-400 text-sm pr-3">
					© { domain }
				</p>

				<a
					href="https://pitch.com"
					target="_blank"
					rel="noreferrer"
					className="pl-3 text-gray-400 text-sm underline hover:text-gray-600"
				>
					{ t('footer.pitch') }
				</a>
			</div>

			<p className="text-sm text-gray-600 text-center">
				{ t('footer.support',
					<a
						href="https://www.howest.be/en"
						target="_blank"
						rel="noreferrer"
						className="underline"
					>
						HOWEST University Brugge
					</a>,
				) }
			</p>

			<a href="https://github.com/wowtvds/kojo-blockchain-project" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-emerald-900">
				<Icon
					name="GitHub"
					size={40}
				/>
			</a>
		</div>
	)
}

export default BottomBar;

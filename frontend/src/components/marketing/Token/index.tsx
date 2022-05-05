import { FunctionComponent } from 'react';
import cn from "classnames";

import { TokenProps } from "./types";

import { useTranslation } from "@/hooks";
import {
	Icon,
} from '@/components';

const Token: FunctionComponent<TokenProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<section className={cn(className, '')}>
			<div className='max-w-screen-lg mx-auto px-6 sm:px-10 py-10 sm:py-16 flex flex-col items-center'>
				<p className="font-sans font-semibold text-gray-400 uppercase tracking-wider">
					{ t('token.title') }
				</p>

				<h2 className="font-serif mt-6 text-center text-emerald-900 text-4xl leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
					{ t('token.subtitle') }
				</h2>

				<Icon
					name="KojoToken"
					size={200}
					className="mt-10 text-emerald-600"
				/>
			</div>
		</section>
	)
}

export default Token;

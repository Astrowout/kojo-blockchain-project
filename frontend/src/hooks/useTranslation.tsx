import { useState, useEffect, Fragment } from "react";
import get from "lodash/get";

import enTranslations from "@/assets/i18n/en";

const useTranslation = () => {
	const translate = (key: string, ...elements): JSX.Element => {
		const translationString = get(enTranslations, key, key);

		if (!!elements.length) {
			const splitString = translationString.split("{$}");

			return (
				<>
					{elements.map((element, index) => (
						<Fragment key={index}>
							{index === 0 && splitString[index]}
							{element}
							{index < elements.length && splitString[index + 1]}
						</Fragment>
					))}
				</>
			);
		}

		return translationString;
	};

 	return {
	  	t: translate,
	};
};


export default useTranslation;

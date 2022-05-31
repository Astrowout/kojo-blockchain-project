import { Fragment } from "react";
import get from "lodash/get";

import enTranslations from "../assets/i18n/en";

const useTranslation = () => {
	const translate = (key: string, ...elements: any[]): JSX.Element => {
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

	const translateString = (key: string, ...data: (string | number)[]): string => {
		const translationString = get(enTranslations, key, key);

		if (!!data.length) {
			const splitString = translationString.split("{$}");

			return data.map((item, index) => `${index === 0 && splitString[index]}${item}${index < data.length && splitString[index + 1]}`).join("");
		}

		return translationString;
	};

 	return {
	  	t: translate,
	  	ts: translateString,
	};
};


export default useTranslation;

import { FunctionComponent, memo } from "react";

import { useTranslation } from "../../hooks";
import {
	Icon,
} from "..";
import { AmountInputProps } from "./AmountInput.types";

const AmountInput: FunctionComponent<AmountInputProps> = ({
	value = 80,
	balance = 0,
	onChange = () => null,
}) => {
	const { t } = useTranslation();

	return (
		<div>
			<label htmlFor="amount" className="text-sm text-black uppercase font-title">
				{ t("hydrate.amount") }
			</label>

			<div className="mt-1 flex justify-between rounded-md bg-background border border-border h-20 overflow-hidden">
				<button
					className="h-full w-20 flex items-center justify-center hover:bg-border transition-shadow active:shadow-inner group border-solid border-r border-gray-100"
					onClick={() => onChange(value - 1)}
				>
					<Icon
						name="Minus"
						size={28}
						className="group-active:scale-75 duration-150"
					/>
				</button>

				<div className="flex items-center justify-center">
					<Icon
						name="KojoToken"
						size={24}
						className="mr-3 mt-0.5 text-gray-400"
					/>

					<input
						type="number"
						name="amount"
						id="amount"
						className="bg-background  font-text font-bold text-3xl h-full w-16 border-gray-300 rounded-md outline-none"
						step="1"
						min="1"
						max={balance}
						value={value || ""}
						placeholder="80"
						title="Numbers only"
						onChange={(e) => onChange(parseInt(e.target.value, 10))}
					/>
				</div>

				<button
					className="h-full w-20 flex items-center justify-center hover:bg-emerald-50 transition-shadow active:shadow-inner group border-solid border-l border-gray-100 disabled:opacity-50 disabled:bg-transparent disabled:pointer-events-none"
					onClick={() => onChange(value + 1)}
					disabled={balance <= value}
				>
					<Icon
						name="Plus"
						size={28}
						className="group-active:scale-75 duration-150"
					/>
				</button>
			</div>

			{balance < value && (
				<p className="text-red-500 flex space-x-2 mt-8">
					<Icon
						name="Danger"
						className="mt-0.5"
						size={24}
					/>

					<span>
						{ t("hydrate.insufficient") }
					</span>
				</p>
			)}
		</div>
	)
}

export default memo(AmountInput);

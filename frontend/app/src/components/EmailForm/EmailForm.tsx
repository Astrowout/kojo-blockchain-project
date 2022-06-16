import { FormEvent, FunctionComponent, memo, useRef } from "react";
import cn from "classnames";

import Icon from "../Icon/Icon";
import { EmailFormProps } from "./EmailForm.types";

const EmailForm: FunctionComponent<EmailFormProps> = ({
	className,
	placeholder = "john.doe@gmail.com",
	disabled = false,
	label = "",
	onSubmit = () => null,
}) => {
	const input = useRef(null);

	const classes = cn(
		className,
		"flex flex-col w-full"
	);

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();

		const emailInput = input.current as unknown as HTMLInputElement;
		const isValidEmail = emailInput.checkValidity();

		if (isValidEmail) {
			onSubmit(emailInput.value);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={classes}
		>
			{/* <label
				htmlFor="email"
				className="block text-center font-text text-xs mb-1 text-border-darkest mt-6"
			>
				{label}
			</label> */}

			<div className="flex justify-between mt-3 relative">
				<input
					placeholder={placeholder}
					disabled={disabled}
					type="email"
					required
					name="email"
					id="email"
					autoComplete="email"
					className="w-full overflow-ellipsis text-black bg-border h-12 pl-4 pr-20 rounded-md text-xs font-text focus:ring-2 focus:ring-offset-2 border-0 focus:ring-emerald-600 outline-none"
					ref={input}
				/>

				<button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center bg-kojo text-white px-4 rounded-r-md">
					<Icon name="Send" size={18}></Icon>

					<span className="sr-only">Go back</span>
				</button>
			</div>
		</form>
	);
};

export default memo(EmailForm);

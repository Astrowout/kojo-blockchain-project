import { FC, Fragment, memo, useEffect } from "react";
import cn from "classnames";

import { Icon } from "../../components";

import { LinkProps } from "./Link.types";
import { Link as RouterLink } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

const Link: FC<LinkProps> = ({
	children,
	className,
	url = "",
	external = false,
	light = false,
	loading = false,
	icon = null,
	tooltip = "",
	onClick,
}) => {
	const classes = cn(className, "inline-flex whitespace-nowrap items-center hover:underline", {
		"": !icon,
		"text-emerald-900": !light,
		"text-emerald-900 md:text-emerald-100": light,
		"pointer-events-none opacity-80": loading,
	});

	let timer: any = null;

	useEffect(() => {
		return () => {
			if (timer) {
				clearTimeout(timer);
				timer = null; // eslint-disable-line react-hooks/exhaustive-deps
			}
		}
	}, []);

	const renderContent = () => (
		<>
			{children}

			{icon && !loading && <Icon name={icon} className="ml-2" />}

			{loading && <Icon name="Spinner" className="ml-2 animate-spin" />}
		</>
	)

	if (url) {
		return !external ? (
			<RouterLink
				to={url}
				className={classes}
			>
				{ renderContent() }
			</RouterLink>
		) : (
			<a
				href={url}
				className={classes}
				target="_blank" rel="noreferrer"
			>
				{ renderContent() }
			</a>
		)
	}

	return tooltip ? (
		<Popover
			className="relative inline-flex font-text text-xs"
		>
			<Popover.Button
				as={Fragment}
			>
				<button
					type="button"
					className={classes}
					onClick={onClick}
					disabled={loading}
				>
					{ renderContent() }
				</button>
			</Popover.Button>

			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="scale-90 translate-y-1 opacity-0"
				enterTo="scale-100 opacity-100"
				leave="transition duration-100 ease-out"
				leaveFrom="scale-100 opacity-100"
				leaveTo="scale-90 translate-y-1 opacity-0"
				as={Fragment}
			>
				<Popover.Panel
					className="absolute z-10 bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-sm"
				>
					{({ close }: any) => {
						if (timer) {
							clearTimeout(timer);
							timer = null;
						}

						timer = setTimeout(() => {
							if (timer) {
								timer = null;

								close();
							}
						}, 2000);

						return tooltip;
					}}
				</Popover.Panel>
			</Transition>
	  </Popover>
	) : (
		<button
			type="button"
			className={classes}
			onClick={onClick}
			disabled={loading}
		>
			{ renderContent() }
		</button>
	)
}

export default memo(Link);

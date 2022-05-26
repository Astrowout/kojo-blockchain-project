import { FunctionComponent } from "react";
import NextLink from "next/link";
import { Popover, Transition } from "@headlessui/react";

import cn from "classnames";

import { useTranslation } from "@/hooks";
import {
	Logo,
	Icon,
	Button,
	Link,
} from "@/components";
import { HeaderProps } from "./Header.types";

const Header: FunctionComponent<HeaderProps> = ({
	className = "",
}) => {
	const { t } = useTranslation();

	const renderNavigation = () => (
		<nav className="flex flex-col md:flex-row md:items-center gap-x-12 gap-y-3">
			<Link
				url={process.env.NEXT_PUBLIC_DOWNLOAD_URL}
				icon="External"
				external
			>
				{ t("navigation.download") }
			</Link>

			<Link
				url="https://github.com/wowtvds/kojo-blockchain-project"
				icon="External"
				external
			>
				GitHub
			</Link>

			<Button
				url={process.env.NEXT_PUBLIC_APP_URL}
				compact
			>
				{ t("navigation.app") }
			</Button>
		</nav>
	);

	return (
		<Popover as="header" className={cn(className, "z-50")}>
			<>
				<Transition
					enter="transition duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					className="fixed z-10 inset-0 bg-black/50"
				>
					<Popover.Overlay />
				</Transition>

				<Transition
					enter="transition-transform duration-300 ease-out"
					enterFrom="-translate-y-full"
					enterTo="translate-y-0"
					leave="transition-transform duration-200"
					leaveFrom="translate-y-0"
					leaveTo="-translate-y-full"
					className="block md:hidden px-6 sm:px-10 pt-32 pb-8 absolute z-20 inset-x-0 w-full bg-white shadow-xl"
				>
					<Popover.Panel>
						{ renderNavigation() }
					</Popover.Panel>
				</Transition>

				<div className="2xl:container px-6 sm:px-10 py-10 relative z-20 flex justify-between items-center bg-white">
					<NextLink href="/">
						<a>
							<Logo w={132} />
						</a>
					</NextLink>

					<div className="hidden md:block">
						{ renderNavigation() }
					</div>

					<Popover.Button className="flex md:hidden text-emerald-900 w-10 h-10 items-center justify-center">
						{({ open }: { open: boolean }) => open ? (
							<Icon
								name="Close"
								size={40}
							/>
						) : (
							<Icon
								name="Menu"
								size={40}
							/>
						)}
					</Popover.Button>
				</div>
			</>
		</Popover>
	)
}

export default Header;

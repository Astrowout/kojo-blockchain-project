import { FC } from "react";
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

const Header: FC<HeaderProps> = ({
	className = "",
}) => {
	const { t } = useTranslation();

	const renderNavigation = () => (
		<nav className="flex flex-col md:flex-row md:items-center gap-x-12 gap-y-3">
			<Link url="#how">How it works</Link>
			<Link url="#roadmap">Roadmap</Link>
			<Link url="#trust">Trust</Link>
			<Link url="#team">Team</Link>
			<Link url="#partners">Partners</Link>
			<Link url="#faq">FAQ</Link>




			{/* <Link
				url={process.env.NEXT_PUBLIC_DOWNLOAD_URL}
				icon="External"
				external
			>
				Download the app
			</Link>

			<Link
				url="https://github.com/wowtvds/kojo-blockchain-project"
				icon="External"
				external
			>
				GitHub
			</Link> */}

			<Button
				url={process.env.NEXT_PUBLIC_APP_URL}
				compact
			>
				{ t("navigation.app") }
			</Button>
		</nav>
	);

	return (
		<Popover as="header" className={cn(className, "z-50 fixed w-full shadow-sm bg-white")}>
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
						<a className="flex items-center">
							<Logo w={132} />
							<p className="font-display uppercase text-4xl -ml-16">Kōjō</p>
						</a>
					</NextLink>

					<div className="hidden md:block">
						{ renderNavigation() }
					</div>

					<Popover.Button className="flex md:hidden text-black w-8 h-8 items-center justify-center">
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

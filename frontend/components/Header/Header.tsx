import { Fragment, FunctionComponent } from 'react';

import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import Link from 'next/link';
import cn from "classnames";

import Logo from '../Logo/Logo';

type HeaderProps = {
	size?: number,
	className?: string,
	url?: string,
	dark?: boolean,
}

const Header: FunctionComponent<HeaderProps> = ({ className, dark = false, size = 26, url = "/app/dashboard" }) => {
	return (
		<Popover className="relative bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<Logo />
					</div>

					<div className="-mr-2 -my-2 md:hidden">
						<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="sr-only">Open menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>

					<Link href="#">
						<a className="text-base font-medium text-gray-500 hover:text-gray-900">
							Pricing
						</a>
					</Link>

					<Link href="#">
						<a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
							Docs
						</a>
					</Link>

					<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
						<a href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
							Sign in
						</a>

						<a
							href="#"
							className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
						>
							Sign up
						</a>
					</div>
				</div>
			</div>
		</Popover>
	)
}

export default Header;

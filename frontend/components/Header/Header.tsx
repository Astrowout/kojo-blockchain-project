import { FunctionComponent } from 'react';

import { Popover } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import Link from 'next/link';
import cn from "classnames";

import Logo from '../Logo/Logo';

type HeaderProps = {
	className?: string,
}

const Header: FunctionComponent<HeaderProps> = ({ className }) => {
	return (
		<Popover as="header" className={cn(className, 'relative bg-white')}>
			<div className="2xl:container mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center border-b-2 border-gray-100 py-6">
					<Logo />

					<div className="md:hidden">
						<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="sr-only">Open menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>

					<div className='hidden md:flex md:space-x-10'>
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
					</div>

					<div className="hidden md:flex">
						<a
							href="#"
							className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700"
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

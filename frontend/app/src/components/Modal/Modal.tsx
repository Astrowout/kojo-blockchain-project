
import { Fragment, useRef, memo, FC } from 'react';
import { createPortal } from "react-dom";
import { Dialog, Transition } from '@headlessui/react';
import { ModalProps } from './Modal.types';

const Modal: FC<ModalProps> = ({ children, isOpen = false, onClose }) => {
	const cancelButtonRef = useRef(null);

	return createPortal(
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose ? (state) => onClose(state) : () => null}>
				<div className="flex items-center w-full justify-center min-h-screen pt-4 px-4 pb-20">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" />
					</Transition.Child>

					<Transition.Child
						as="div"
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						className="bg-white w-full rounded-2xl mx-auto text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-md"
					>
						<div className="px-4 py-6 sm:p-10">
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>,
		document.body as any
	)
}

export default memo(Modal);

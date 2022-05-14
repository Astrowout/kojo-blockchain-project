import { FunctionComponent, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { useWallet } from '../../hooks';
import { ButtonContext } from '../Button/Button.types';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import NoWalletDetected from '../NoWalletDetected/NoWalletDetected';
import { ErrorType } from '../../types';
import { ConnectModalProps } from './ConnectModal.types';

const ConnectModal: FunctionComponent<ConnectModalProps> = ({ title, description, close, isOpen }) => {
	const { connectMetaMask, connectWalletConnect, error, isLoading } = useWallet();

	useEffect(() => {
		if (error) {
			close();
		}
	}, [error]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Modal isOpen={isOpen}>
			<div className="flex justify-between">
				<div className="text-left">
					<Dialog.Title as="span" className="text-lg font-bold text-gray-900">
						{title}
					</Dialog.Title>

					<p className="mt-1 text-sm text-gray-500">
						{description}
					</p>
				</div>

				<button
					className="flex items-center justify-center ml-4 w-10 h-10 text-gray-400"
					onClick={close}
				>
					<Icon name="Close" size={32}></Icon>
				</button>
			</div>

			{error && error.type === ErrorType.NO_ETHEREUM && !isLoading && (
				<NoWalletDetected />
			)}

			{isLoading ? (
				<Loader />
			) : (
				<div className="flex flex-col pt-8 space-y-4">
					<Button
						fluid
						icon="MetaMask"
						context={ButtonContext.METAMASK}
						onClick={() => connectMetaMask(close)}
					>
						MetaMask
					</Button>

					<Button
						fluid
						icon="WalletConnect"
						context={ButtonContext.WALLET_CONNECT}
						onClick={connectWalletConnect}
						disabled
					>
						WalletConnect
					</Button>
				</div>
			)}
		</Modal>
	)
}

export default ConnectModal;

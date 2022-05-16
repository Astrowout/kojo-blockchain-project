import { FunctionComponent, useContext, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { ButtonContext } from '../Button/Button.types';
import Loader from '../Loader/Loader';
import NoWalletDetected from '../NoWalletDetected/NoWalletDetected';
import { ErrorType } from '../../types';
import { ConnectModalProps } from './ConnectModal.types';
import { GlobalContext } from '../../context';
import EmailForm from '../EmailForm/EmailForm';
import { useTranslation } from '../../hooks';

const ConnectModal: FunctionComponent<ConnectModalProps> = ({ title, description, close, isOpen }) => {
	const { t } = useTranslation();
	const {
		isLoading,
		error,
		isMetaMaskAvailable,
		connectMetaMask,
		connectWalletConnect,
		connectMagicLink,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (error) {
			close();
		}
	}, [error]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Modal isOpen={isOpen} close={close}>
			<div className="flex flex-col">
				<Dialog.Title as="span" className="text-lg font-bold text-gray-900">
					{title}
				</Dialog.Title>

				<p className="mt-1 text-sm text-gray-500">
					{description}
				</p>
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
						onClick={connectMetaMask}
						disabled={!isMetaMaskAvailable}
					>
						MetaMask
					</Button>

					<Button
						fluid
						icon="WalletConnect"
						context={ButtonContext.WALLET_CONNECT}
						onClick={connectWalletConnect}
					>
						WalletConnect
					</Button>

					<EmailForm
						className="pt-6 border-t"
						label={t("connect.email")}
						onSubmit={connectMagicLink}
					/>
				</div>
			)}
		</Modal>
	)
}

export default ConnectModal;

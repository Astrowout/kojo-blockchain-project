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
		loading,
		error,
		isMetaMaskAvailable,
		connectMetaMask,
		connectMagicLink,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (error) {
			close();
		}
	}, [error]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Modal isOpen={isOpen} close={close}>
			<div className="flex flex-col pr-10">
				<Dialog.Title as="h2" className="font-bold text-gray-900 font-title uppercase text-sm">
					{ title }
				</Dialog.Title>

				<p className="mt-0.5 text-black font-text text-xs">
					{ description }
				</p>
			</div>

			{error && error.type === ErrorType.NO_ETHEREUM && !loading && (
				<NoWalletDetected />
			)}

			{loading ? (
				<Loader />
			) : (
				<div className="flex flex-col pt-8 space-y-4">

<label
				htmlFor="email"
				className="block text-sm text-center text-black font-title uppercase text-2xs mb-4 mt-6"
			>
				with Metamask
			</label>
					<Button
						fluid
						icon="MetaMask"
						context={ButtonContext.METAMASK}
						onClick={connectMetaMask}
						disabled={!isMetaMaskAvailable}
					>
						connect
					</Button>

					{/* <Button
						fluid
						icon="WalletConnect"
						context={ButtonContext.WALLET_CONNECT}
						onClick={connectWalletConnect}
					>
						WalletConnect
					</Button> */}

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

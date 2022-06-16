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

{/* <label
				htmlFor="email"
				className="block text-center font-text text-xs mb-1 text-border-darkest mt-6"
			>
				with Metamask
			</label> */}
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

					<div>

					</div>

<div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 bg-background text-border-darkest font-text text-xs">or connect with email</span>
      </div>
    </div>

					<EmailForm
						className=""
						label='or connect with email'
						onSubmit={connectMagicLink}
					/>
				</div>
			)}
		</Modal>
	)
}

export default ConnectModal;

/* eslint-disable react/require-default-props */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props {
	closeModal?: () => void;
	children: any;
	header: string;
	closeBtText?: string;
	showConfirmation?: boolean;
	confirmationButtonText?: string;
	confirmModalCallback?: () => void;
	show?: boolean;
}

const ModalBootstrap: React.FC<Props> = (props: Props) => {
	const {
		closeModal, children, header, closeBtText, confirmationButtonText, confirmModalCallback, showConfirmation, show,
	} = props;

	const onCloseModal = () => {
		if (closeModal) {
			closeModal();
		}
	};

	const onConfirm = () => {
		if (confirmModalCallback) {
			confirmModalCallback();
		}
	};

	const showConfirmationButton = () => {
		return showConfirmation && (
			<Button variant="secondary" onClick={onConfirm}>
				{ confirmationButtonText || 'Ok' }
			</Button>
		);
	};

	return (
		<Modal show={show} onHide={onCloseModal}>
			<Modal.Header closeButton>
				<Modal.Title>{header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					{ closeBtText || 'Close' }
				</Button>
				{showConfirmationButton()}
			</Modal.Footer>
		</Modal>
	);
};

export default ModalBootstrap;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props {
	closeModal: () => void;
	showModal: boolean;
	children: any;
	header: string;

}

const ModalBootstrap: React.FC<Props> = (props: Props) => {
	const {
		closeModal, showModal, children, header,
	} = props;
	return (
		<Modal show={showModal} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>{header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalBootstrap;

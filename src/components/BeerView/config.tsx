import Details, { Detail, DetailTypes } from 'components/Details';
import { Modal } from 'components/index';
import React from 'react';
import { BaseBeer } from 'store/redux/beers/interfaces';

const details: Array<Detail<BaseBeer>> = [
	{ label: 'Name', key: 'name' },
	{ label: 'Description', key: 'description' },
	{ label: 'Tagline', key: 'tagline' },
	{ label: 'Food Pairing', key: 'food_pairing', type: DetailTypes.ARRAY },
	{ label: 'First Brewed', key: 'first_brewed' },
];

export const beerModal = (closeModalCb: () => void = () => {}) => (showModal: boolean, data: BaseBeer) => (
	<Modal closeModal={closeModalCb} show={showModal} header="Beer Information">
		<Details config={{ details, data }} />
	</Modal>
);


import Details, { Detail, DetailTypes } from '../components/Details';
import { Beer } from '../store/redux/beers/interfaces';
import { Modal } from '../components';
import React from 'react';

const details: Array<Detail<Beer>> = [
	{ label: 'Name', key: 'name' },
	{ label: 'Description', key: 'description' },
	{ label: 'Tagline', key: 'tagline' },
	{ label: 'Food Pairing', key: 'food_pairing', type: DetailTypes.ARRAY },
	{ label: 'First Brewed', key: 'first_brewed' },
];

export const beerModal = (closeModalCb: () => void) => (showModal: boolean, data: Beer) => (
	<Modal closeModal={closeModalCb} showModal={showModal} header="Beer Information">
		<Details config={{ details, data }} />
	</Modal>
);


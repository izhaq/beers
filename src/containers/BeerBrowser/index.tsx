import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes as actionTypes, Beer } from '../../store/redux/beers/interfaces';
import {
	BeerCard, InputSearch, Modal, Pagination,
} from '../../components';
import { beersSelector } from '../../store/redux/beers';
import './style.scss';
import Details from '../../components/Details';

const BeerBrowser: React.FC = () => {
	const { selectors: { beers }, actions: { onLoadMoreBeers } } = connect();
	const onSearchQueryChange = useCallback((input: string) => console.log(input), []);

	const [selectedBeer, setSelectedBeer] = useState({} as Beer);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = (beer: Beer) => {
		setSelectedBeer(beer);
		setShow(true);
	};

	const renderBeerView = () => {
		const { data: beerList } = beers;
		return beerList.map((beer: Beer) => (<BeerCard key={beer.id} beer={beer} onClick={() => handleShow(beer)} />));
	};

	const renderBeerModal = () => {
		const {
			name, description, tagline, food_pairing: foodPairing, first_brewed: firstBrewed,
		} = selectedBeer;
		return (
			<Modal closeModal={handleClose} showModal={show} header="Beer Information">
				<Details data={[
					{ label: 'Name', value: name },
					{ label: 'Description', value: description },
					{ label: 'Tagline', value: tagline },
					{ label: 'Food Pairing', value: foodPairing.join(', ') },
					{ label: 'First Brewed', value: firstBrewed },
				]}
				/>
			</Modal>
		);
	};

	return (
		<>
			<div className="card-browser">
				<div className="search-container">
					<InputSearch onChange={onSearchQueryChange} />
				</div>
				<div className="cards">
					<Pagination loadMoreHandler={onLoadMoreBeers}>
						{renderBeerView()}
					</Pagination>
				</div>
			</div>
			{renderBeerModal()}
		</>
	);
};

const connect = () => {
	const beers = useSelector(beersSelector.beers);
	const { hasMore } = beers;
	const dispatch = useDispatch();
	const onLoadMoreBeers = useCallback((page: number) => hasMore && dispatch({ type: actionTypes.GET_BEERS, page }), []);
	return {
		selectors: {
			beers: useSelector(beersSelector.beers),
		},
		actions: {
			onLoadMoreBeers,
		},
	};
};

export default BeerBrowser;

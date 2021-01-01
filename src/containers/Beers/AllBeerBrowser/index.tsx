import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes as actionTypes, Beer } from '../../../store/redux/beers/interfaces';
import {
	BeerCard,
	CustomCard, Pagination,
} from '../../../components';
import { beersSelector } from '../../../store/redux/beers';
import './style.scss';
import Rating from '@material-ui/lab/Rating';
import { Container } from 'react-bootstrap';
import SearchBeerFoodParing from '../SearchBeerFoodParing';
import { beerModal } from '../../config';

const BeerBrowser: React.FC = () => {
	const { selectors: { beers }, actions: { onLoadMoreBeers } } = connect();

	const [selectedBeer, setSelectedBeer] = useState({} as Beer);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = (beer: Beer) => {
		setSelectedBeer(beer);
		setShow(true);
	};
	const renderModal = beerModal(handleClose);

	const renderBeerView = () => {
		const { data: beerList } = beers;
		return beerList.map((beer: Beer) => (
			<CustomCard key={beer.id} onClick={() => handleShow(beer)}>
				<Rating
					name={beer.id.toString()}
					onChange={(event, newValue) => {
						console.log(newValue);
					}}
				/>
				<BeerCard beer={beer} onFavoriteChange={(beerItem: Beer) => console.log(beerItem)} />
			</CustomCard>
		));
	};

	return (
		<Container className="card-browser-container">
			<div className="card-browser">
				<SearchBeerFoodParing />
				<div className="cards">
					<Pagination loadMoreHandler={onLoadMoreBeers}>
						{renderBeerView()}
					</Pagination>
				</div>
			</div>
			{renderModal(show, selectedBeer)}
		</Container>
	);
};

const connect = () => {
	const beers = useSelector(beersSelector.beers);
	const { hasMore } = beers;
	const dispatch = useDispatch();
	const onLoadMoreBeers = (page: number) => {
		if (hasMore) {
			dispatch({ type: actionTypes.GET_BEERS });
		}
	};
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

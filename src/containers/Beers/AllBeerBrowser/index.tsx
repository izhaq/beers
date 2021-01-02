import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	BeerCard,
	CustomCard, Pagination,
} from 'components';
import { beersSelector, BeersTypes } from 'store/redux/beers/availableBeers';
import './style.scss';
import Rating from '@material-ui/lab/Rating';
import { Row, Col, Container } from 'react-bootstrap';
import SearchBeerFoodParing from '../SearchBeerFoodParing';
import { beerModal } from 'containers/Beers/config';
import { BaseBeer, Beer } from 'store/redux/beers/interfaces';
import { FavoriteBeersTypes } from 'store/redux/beers/favoriteBeers';

const BeerBrowser: React.FC = () => {
	const {
		selectors: { beers },
		actions: { onLoadMoreBeers, updateBeerAsFavorite },
		local: {
			selectedBeer, setSelectedBeer, setShow, show,
		},
	} = connect();

	const handleClose = () => setShow(false);

	const handleShow = (beer: BaseBeer) => {
		setSelectedBeer(beer);
		setShow(true);
	};

	const renderModal = beerModal(handleClose);

	const renderBeerView = () => {
		const { data: beerList } = beers;
		return (
			<Row>
				{
					beerList.map((beer: Beer) => (
						<Col key={beer.id} className="col-lg-3 col-md-4 col-sm-6 margin">
							<CustomCard onClick={() => handleShow(beer)}>
								<Rating
									name={beer.id.toString()}
									onChange={(event, newValue) => {
										console.log(newValue);
									}}
								/>
								<BeerCard
									beer={beer}
									onFavoriteChange={
										(beerItem: Beer, isFavorite: boolean) => updateBeerAsFavorite(beerItem, isFavorite)
									}
								/>
							</CustomCard>
						</Col>
					))
				}
			</Row>
		);
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
	const [selectedBeer, setSelectedBeer] = useState({} as BaseBeer);
	const [show, setShow] = useState(false);
	const beers = useSelector(beersSelector.beers);
	const { hasMore } = beers;
	const dispatch = useDispatch();

	return {
		selectors: {
			beers: useSelector(beersSelector.beers),
		},
		actions: {
			onLoadMoreBeers: (page: number) => (
				hasMore && dispatch({ type: BeersTypes.GET_BEERS })
			),
			updateBeerAsFavorite: (beer: Beer, isFavorite: boolean) => (isFavorite
				? dispatch({ type: FavoriteBeersTypes.ADD_FAVORITE_BEER, beer })
				: dispatch({ type: FavoriteBeersTypes.REMOVE_FAVORITE_BEER, beerId: beer.id })),
		},
		local: {

			selectedBeer,
			setSelectedBeer,
			show,
			setShow,
		},
	};
};

export default BeerBrowser;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	BeerView,
	CustomCard, Pagination,
} from 'components';
import { availableBeersSelector, AvailableBeersTypes } from 'store/redux/beers/availableBeers';
import './style.scss';
import { Row, Col, Container } from 'react-bootstrap';
import SearchBeerFoodParing from '../SearchBeerFoodParing';
import { Beer } from 'store/redux/beers/interfaces';
import { FavoriteBeersTypes } from 'store/redux/beers/favoriteBeers';

const BeerBrowser: React.FC = () => {
	const {
		selectors: { beers },
		actions: { onLoadMoreBeers, updateBeerAsFavorite },
	} = connect();

	const renderBeerView = () => {
		const { data: beerList } = beers;
		return (
			<Row>
				{
					beerList.map((beer: Beer) => (
						<Col key={beer.id} className="col-lg-3 col-md-4 col-sm-6 margin">
							<CustomCard>
								<BeerView
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
		</Container>
	);
};

const connect = () => {
	const beers = useSelector(availableBeersSelector.beers);
	const { hasMore } = beers;
	const dispatch = useDispatch();

	return {
		selectors: {
			beers,
		},
		actions: {
			onLoadMoreBeers: () => (
				hasMore && dispatch({ type: AvailableBeersTypes.GET_BEERS })
			),
			updateBeerAsFavorite: (beer: Beer, favorite: boolean) => {
				if (favorite) {
					dispatch({ type: FavoriteBeersTypes.ADD_FAVORITE_BEER, beersToAdd: [beer] });
				} else {
					dispatch({ type: FavoriteBeersTypes.REMOVE_FAVORITE_BEER, beersToRemove: [beer.id] });
				}
				dispatch({ type: AvailableBeersTypes.UPDATE_BEER_AS_FAVORITE, beersToUpdate: [{ beerId: beer.id, favorite }] });
			},
		},
	};
};

export default BeerBrowser;

/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	BeerView,
	CustomCard, Modal, Ranking,
} from 'components';
import { AvailableBeersTypes } from 'store/redux/beers/availableBeers';
import './style.scss';
import {
	Row, Col, Container, Button,
} from 'react-bootstrap';
import { favoriteBeersSelector, FavoriteBeersTypes } from 'store/redux/beers/favoriteBeers';
import { v4 as uniqueId } from 'uuid';
import { Beer } from 'store/redux/beers/interfaces';

const FavoriteBeersBrowser: React.FC = () => {
	const {
		selectors: { beers },
		actions: { updateBeerAsFavorite, removeAllFavorites, updateBeerRanking },
		local: {
			showWarning, setShowWarning,
		},
	} = connect();

	const onCloseWarningModal = () => {
		setShowWarning(false);
	};

	const onConfirmRemoveFavorite = () => {
		removeAllFavorites();
		setShowWarning(false);
	};

	const onOpenWarningModal = () => {
		return (
			<Modal
				closeModal={() => onCloseWarningModal()}
				confirmationButtonText="Confirm"
				showConfirmation
				confirmModalCallback={() => onConfirmRemoveFavorite()}
				show={showWarning}
				header="Beer Information"
			>
				Are you sure you want to delete all favorites ?
			</Modal>
		);
	};

	const renderBeerView = () => {
		return (
			<Row>
				{
					beers.map((beer: Beer) => (
						<Col key={uniqueId()} className="col-lg-3 col-md-4 col-sm-6 margin">
							<CustomCard>
								<BeerView
									beer={beer}
									onFavoriteChange={(beerItem: Beer) => updateBeerAsFavorite(beerItem.id)}
								/>
								<Ranking
									rank={beer.ranking}
									id={beer.id}
									onClick={(id: number, rank: number) => {
										updateBeerRanking(id, rank);
									}}
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
				<Row>
					<Col>
						<div className="remove-all-container">
							<Button className="remove-all-btn" onClick={() => setShowWarning(true)}>Remove All Favorites</Button>
						</div>
					</Col>
				</Row>
				<div className="favorite-cards">
					{renderBeerView()}
				</div>
			</div>
			{onOpenWarningModal()}
		</Container>
	);
};

const connect = () => {
	const beersSelector = useSelector(favoriteBeersSelector.beers);
	const [showWarning, setShowWarning] = useState(false);
	const dispatch = useDispatch();

	return {
		selectors: {
			beers: beersSelector,
		},
		actions: {
			updateBeerRanking: useCallback((beerId: number, ranking: number) => dispatch({
				type: FavoriteBeersTypes.SET_BEER_RANKING, beerId, ranking,
			}), []),
			updateBeerAsFavorite: useCallback((beerId: number) => {
				dispatch({ type: FavoriteBeersTypes.REMOVE_FAVORITE_BEER, beersToRemove: [beerId] });
				dispatch({ type: AvailableBeersTypes.UPDATE_BEER_AS_FAVORITE, beersToUpdate: [{ beerId, favorite: false }] });
			}, []),
			removeAllFavorites: useCallback(() => {
				dispatch({ type: AvailableBeersTypes.UPDATE_BEER_AS_FAVORITE, beersToUpdate: beersSelector.map((beer) => ({ beerId: beer.id, favorite: false })) });
				dispatch({ type: FavoriteBeersTypes.REMOVE_ALL_FAVORITES });
			}, []),
		},
		local: {
			showWarning, setShowWarning,
		},
	};
};

export default FavoriteBeersBrowser;

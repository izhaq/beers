import { createReducer, createActions } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { ApplicationState } from 'store/redux';
import {
	ActionTypes,
	FavoritesBeersState,
	ActionCreator,
	AddFavoriteBeerAction, RemoveFavoriteBeersAction, SetBeerRankingAction,
} from './interfaces';
import { Beer } from '../interfaces';

const { Creators } = createActions<ActionTypes, ActionCreator>({
	addFavoriteBeer: ['beersToAdd'],
	removeFavoriteBeer: ['beersToRemove'],
	removeAllFavorites: [],
	setBeerRanking: ['beerId', 'ranking'],
});

export const FavoriteBeersTypes = ActionTypes;
export default Creators;

const initialState = Immutable<FavoritesBeersState>({
	beers: [],
});

/* ------------- Selectors ------------- */

export const favoriteBeersSelector = {
	beers: (state: ApplicationState) => state.beers.favoriteBeers.beers,
};

/* ------------- Reducers ------------- */

const addFavoriteBeersReducer = (state: ImmutableObject<FavoritesBeersState>, action: AddFavoriteBeerAction) => {
	const { beersToAdd } = action;
	const { beers } = state;
	const newFavoriteBeers = beersToAdd.map((beer) => ({ ...beer, isFavorite: true }));
	return state.merge({ beers: beers.concat(newFavoriteBeers) });
};

const removeFavoriteBeersReducer = (state: ImmutableObject<FavoritesBeersState>, action: RemoveFavoriteBeersAction) => {
	const { beersToRemove } = action;
	const { beers } = state;
	return state.merge({ beers: beers.filter((beer: ImmutableObject<Beer>) => !beersToRemove.includes(beer.id)) });
};

const removeAllFavoriteReducer = (state: ImmutableObject<FavoritesBeersState>) => {
	return state.merge({ beers: [] });
};

const setBeerRankingReducer = (state: ImmutableObject<FavoritesBeersState>, action: SetBeerRankingAction) => {
	const { beerId, ranking } = action;
	const { beers } = state;
	const beerIndex = beers.findIndex((beer: Beer) => beer.id === beerId);
	return state.updateIn(['beers', beerIndex, 'ranking'], () => ranking);
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(initialState, {
	[FavoriteBeersTypes.ADD_FAVORITE_BEER]: addFavoriteBeersReducer,
	[FavoriteBeersTypes.REMOVE_FAVORITE_BEER]: removeFavoriteBeersReducer,
	[FavoriteBeersTypes.REMOVE_ALL_FAVORITES]: removeAllFavoriteReducer,
	[FavoriteBeersTypes.SET_BEER_RANKING]: setBeerRankingReducer,
});

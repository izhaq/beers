import { createReducer, createActions } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { ApplicationState } from 'store/redux';
import {
	ActionTypes,
	FavoritesBeersState,
	ActionCreator,
	AddFavoriteBeerAction, RemoveFavoriteBeersAction, RemoveAllFavoriteAction, SetBeerRankingAction,
} from './interfaces';
import { Beer } from '../interfaces';

const { Creators } = createActions<ActionTypes, ActionCreator>({
	addFavoriteBeer: ['beer'],
	removeFavoriteBeer: ['beerId'],
	removeAllFavorites: [],
	setBeerRanking: ['beerId', 'ranking'],
});

export const FavoriteBeersTypes = ActionTypes;
export default Creators;

const initialState = Immutable<FavoritesBeersState>({
	beers: [],
});

/* ------------- Selectors ------------- */

export const beersSelector = {
	beers: (state: ApplicationState) => state.beers.favoriteBeers.beers,
};

/* ------------- Reducers ------------- */

const addFavoriteBeersReducer = (state: ImmutableObject<FavoritesBeersState>, action: AddFavoriteBeerAction) => {
	const { beer } = action;
	const { beers } = state;
	return state.merge({ beers: beers.concat([beer]) });
};

const removeFavoriteBeersReducer = (state: ImmutableObject<FavoritesBeersState>, action: RemoveFavoriteBeersAction) => {
	const { beerId } = action;
	const { beers } = state;
	return state.merge({ beers: beers.filter((beer: ImmutableObject<Beer>) => beer.id !== beerId) });
};

const removeAllFavoriteReducer = (state: ImmutableObject<FavoritesBeersState>, action: RemoveAllFavoriteAction) => {
	return state.merge({ beers: [] });
};

const setBeerRankingReducer = (state: ImmutableObject<FavoritesBeersState>, action: SetBeerRankingAction) => {
	return state.merge({ beers: [] });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(initialState, {
	[FavoriteBeersTypes.ADD_FAVORITE_BEER]: addFavoriteBeersReducer,
	[FavoriteBeersTypes.REMOVE_FAVORITE_BEER]: removeFavoriteBeersReducer,
	[FavoriteBeersTypes.REMOVE_ALL_FAVORITES]: removeAllFavoriteReducer,
	[FavoriteBeersTypes.SET_BEER_RANKING]: setBeerRankingReducer,
});

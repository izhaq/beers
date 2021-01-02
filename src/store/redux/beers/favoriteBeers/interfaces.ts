import { Action } from 'redux';
import { Beer, Ranking } from 'store/redux/beers/interfaces';

export interface FavoritesBeersState {
	beers: FavoriteBeers;
}

export enum ActionTypes {
	ADD_FAVORITE_BEER = 'ADD_FAVORITE_BEER',
	REMOVE_FAVORITE_BEER = 'REMOVE_FAVORITE_BEER',
	REMOVE_ALL_FAVORITES = 'REMOVE_ALL_FAVORITES',
	SET_BEER_RANKING = 'SetBeerRanking',
}

export interface ActionCreator {
	addFavoriteBeer: (beer: Beer) => AddFavoriteBeerAction,
	removeFavoriteBeer: (beerId: string) => RemoveFavoriteBeersAction,
	removeAllFavorites: () => RemoveAllFavoriteAction,
	setBeerRanking: (beerId: string, ranking: Ranking) => SetBeerRankingAction,
}

export interface AddFavoriteBeerAction extends Action<ActionTypes.ADD_FAVORITE_BEER> {
	beer: Beer;
}

export interface RemoveFavoriteBeersAction extends Action<ActionTypes.REMOVE_FAVORITE_BEER> {
	beerId: number;
}

export type RemoveAllFavoriteAction = Action<ActionTypes.REMOVE_ALL_FAVORITES>;

export interface SetBeerRankingAction extends Action<ActionTypes.SET_BEER_RANKING> {
	beerId: string;
	ranking: Ranking;
}

export type FavoriteBeers = Array<Beer>;

import { Action } from 'redux';
import { Pagination } from 'store/redux/interfaces';
import { Beer } from '../interfaces';

export interface AvailableBeersState {
	beers: Beers;
}

export enum ActionTypes {
	GET_BEERS = 'GET_BEERS',
	SET_BEERS = 'SET_BEERS',
	UPDATE_BEER_AS_FAVORITE = 'UPDATE_BEER_AS_FAVORITE',
	GET_BEERS_BY_QUERY = 'GET_BEERS_BY_QUERY',
}

export interface ActionCreator {
	setBeers: (beers: Array<Beer>, hasMore: boolean) => SetBeersAction,
	getBeers: (page: number) => GetBeersAction,
	getBeersByQuery: (searchQuery: string) => GetBeersByQueryAction,
	updateBeerAsFavorite: (beersToUpdate: Array<{beerId: number; favorite: boolean}>) => UpdateBeersAsFavoriteAction,
}

export interface SetBeersAction extends Action<ActionTypes.SET_BEERS> {
	beers: Array<Beer>;
	hasMore: boolean;
}

export type GetBeersAction = Action<ActionTypes.GET_BEERS>;

export interface GetBeersByQueryAction extends Action<ActionTypes.GET_BEERS> {
	searchQuery: string;
}

export interface UpdateBeersAsFavoriteAction extends Action<ActionTypes.UPDATE_BEER_AS_FAVORITE> {
	beersToUpdate: Array<{beerId: number; favorite: boolean;}>
}

export interface Beers extends Pagination{
	data: Array<Beer>;
}

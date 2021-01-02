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
}

export interface ActionCreator {
	setBeers: (beers: Array<Beer>, resetPage: boolean) => SetBeersAction,
	getBeers: (page: number) => GetBeersAction,
	updateBeerAsFavorite: (beerId: number, favorite: boolean) => UpdateBeerAsFavoriteAction,
}

export interface SetBeersAction extends Action<ActionTypes.SET_BEERS> {
	beers: Array<Beer>;
	resetPage: boolean;
}

export interface GetBeersAction extends Action<ActionTypes.GET_BEERS> {
	searchQuery?: string;
}

export interface UpdateBeerAsFavoriteAction extends Action<ActionTypes.UPDATE_BEER_AS_FAVORITE> {
	beerId: number;
	favorite: boolean;
}

export interface Beers extends Pagination{
	data: Array<Beer>;
}

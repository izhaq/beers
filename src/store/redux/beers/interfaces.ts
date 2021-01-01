import { Action } from 'redux';
import { Pagination } from '../interfaces';

export interface BeersState {
	beers: Beers;
}

export enum ActionTypes {
	GET_BEERS = 'GET_BEERS',
	SET_BEERS = 'SET_BEERS',
	GET_FAVORITE_BEERS = 'GET_FAVORITE_BEERS',
}

export interface ActionCreator {
	setBeers: (beers: Array<Beer>, resetPage: boolean) => SetBeersAction,
	getBeers: (page: number) => GetBeersAction,
	getFavoriteBeers: () => GetFavoriteBeersAction
}

export interface SetBeersAction extends Action<ActionTypes.SET_BEERS> {
	beers: Array<Beer>;
	resetPage: boolean;
}

export interface GetBeersAction extends Action<ActionTypes.GET_BEERS> {
	searchQuery?: string;
}

export type GetFavoriteBeersAction = Action<ActionTypes.GET_FAVORITE_BEERS>;

export interface Beer{
	id: number;
	name: string;
	description: string;
	tagline: string;
	first_brewed: string;
	food_pairing: Array<string>
}

export interface Beers extends Pagination{
	data: Array<Beer>;
}

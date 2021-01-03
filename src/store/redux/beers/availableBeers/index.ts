import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { ApplicationState } from 'store/redux';
import {
	ActionCreator,
	ActionTypes,
	AvailableBeersState,
	SetBeersAction,
	UpdateBeersAsFavoriteAction,
} from './interfaces';
import { Beer } from '../interfaces';

const { Creators } = createActions<ActionTypes, ActionCreator>({
	setBeers: ['beers', 'resetPage'],
	getBeers: ['page'], // handled by saga,
	updateBeerAsFavorite: ['beersToUpdate'],
});

export const AvailableBeersTypes = ActionTypes;
export default Creators;

const initialState = Immutable<AvailableBeersState>({
	beers: {
		data: [],
		pageSize: 26,
		page: 1,
		hasMore: true,
	},
});

/* ------------- Selectors ------------- */

export const availableBeersSelector = {
	beers: (state: ApplicationState) => state.beers.availableBeers.beers,
};

/* ------------- Reducers ------------- */

const setBeersReducer = (state: ImmutableObject<AvailableBeersState>, action: SetBeersAction) => {
	const { beers: additionalBeers, resetPage } = action;
	const { beers: { page, data, ...rest } } = state;
	return additionalBeers.length > 0
		? state.merge({
			beers: {
				page: resetPage ? 1 : page + 1,
				data: resetPage ? additionalBeers : data.concat(additionalBeers),
				...rest,
			},
		}) : state.merge({
			beers: {
				...state.beers,
				hasMore: false,
				data: resetPage ? [] : data,
			},
		});
};

const updateBeersAsFavoriteReducer = (state: ImmutableObject<AvailableBeersState>, action: UpdateBeersAsFavoriteAction) => {
	const { beersToUpdate } = action;
	let newState = state;
	beersToUpdate.forEach(({ beerId, favorite }: { beerId: number; favorite: boolean }) => {
		const { beers: { data } } = newState;
		const beerIndex = data.findIndex((beer: Beer) => beer.id === beerId);
		const beer = data[beerIndex].updateIn(['isFavorite'], () => favorite);
		newState = newState.updateIn(['beers', 'data', beerIndex], () => beer);
	});
	return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(initialState, {
	[AvailableBeersTypes.SET_BEERS]: setBeersReducer,
	[AvailableBeersTypes.UPDATE_BEER_AS_FAVORITE]: updateBeersAsFavoriteReducer,
});

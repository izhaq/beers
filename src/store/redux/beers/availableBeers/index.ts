import { createReducer, createActions } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { ApplicationState } from 'store/redux';
import {
	ActionTypes, AvailableBeersState, ActionCreator, SetBeersAction, UpdateBeerAsFavoriteAction,
} from './interfaces';

const { Creators } = createActions<ActionTypes, ActionCreator>({
	setBeers: ['beers', 'resetPage'],
	getBeers: ['page'], // handled by saga,
	updateBeerAsFavorite: ['beerId', 'favorite'],
});

export const BeersTypes = ActionTypes;
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

export const beersSelector = {
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

const updateBeerAsFavoriteRedicer = (state: ImmutableObject<AvailableBeersState>, action: UpdateBeerAsFavoriteAction) => {
	const { beerId, favorite } = action;
	const { beers: { data } } = state;
	state.updateIn(obj, ['foo', 'bar'], add, 10);
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(initialState, {
	[BeersTypes.SET_BEERS]: setBeersReducer,
});

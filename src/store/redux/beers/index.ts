import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	ActionTypes, BeersState, ActionCreator, SetBeersAction,
} from './interfaces';

const { Creators } = createActions<ActionTypes, ActionCreator>({
	setBeers: ['beers', 'resetPage'],
	getBeers: ['page'], // handled by saga
	getFavoriteBeers: [],
});

export const BeersTypes = ActionTypes;
export default Creators;

const initialState: BeersState = {
	beers: {
		data: [],
		pageSize: 26,
		page: 1,
		hasMore: true,
	},
};

/* ------------- Selectors ------------- */

export const beersSelector = {
	beers: (state: ApplicationState) => state.beers.beers,
};

/* ------------- Reducers ------------- */

const setBeersReducer = (state: BeersState, action: SetBeersAction) => {
	const { beers: additionalBeers, resetPage } = action;
	const { beers: { page, data, ...rest } } = state;
	const newState = additionalBeers.length > 0 ? {
		...state,
		beers: {
			page: resetPage ? 1 : page + 1,
			data: resetPage ? additionalBeers : [...data, ...additionalBeers],
			...rest,
		},
	} : {
		...state,
		beers: {
			...state.beers,
			hasMore: false,
			data: resetPage ? [] : data,
		},
	};
	return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(initialState, {
	[BeersTypes.SET_BEERS]: setBeersReducer,
});

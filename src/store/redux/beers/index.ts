import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from '../index';
import {
	ActionTypes, BeersState, ActionCreator, SetBeersAction,
} from './interfaces';

const { Creators } = createActions<ActionTypes, ActionCreator>({
	setBeers: ['beers'],
	getBeers: ['page'],
	getFavoriteBeers: [],
});

export const BeersTypes = ActionTypes;
export default Creators;

const initialState: BeersState = {
	beers: {
		data: [],
		pageSize: 16,
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
	const { beers: additionalBeers } = action;
	const { beers: { page, data, ...rest } } = state;
	return additionalBeers.length > 0 ? {
		...state,
		beers: {
			page: page + 1,
			data: [...data, ...additionalBeers],
			...rest,
		},
	} : { ...state, beers: { ...state.beers, hasMore: false } };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(initialState, {
	[BeersTypes.SET_BEERS]: setBeersReducer,
});

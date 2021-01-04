import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { ApplicationState } from 'store/redux';
import {
	ActionCreator,
	ActionTypes,
	AvailableBeersState, GetBeersByQueryAction,
	SetBeersAction,
	UpdateBeersAsFavoriteAction,
} from './interfaces';
import { Beer } from '../interfaces';

const { Creators } = createActions<ActionTypes, ActionCreator>({
	setBeers: ['beers', 'hasMore'],
	getBeers: ['page'], // handled by saga,
	getBeersByQuery: ['searchQuery'], // handled by saga,
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
		searchQuery: '',
	},
});

/* ------------- Selectors ------------- */

export const availableBeersSelector = {
	beers: (state: ApplicationState) => state.beers.availableBeers.beers,
};

/* ------------- Reducers ------------- */

const setBeersReducer = (state: ImmutableObject<AvailableBeersState>, action: SetBeersAction) => {
	const { beers: additionalBeers, hasMore } = action;
	const {
		beers: {
			page, data, ...rest
		},
	} = state;
	return state.merge({
		beers: {
			...rest,
			page: page + 1,
			data: additionalBeers,
			hasMore,
		},
	});
};

const getBeersByQueryReducer = (state: ImmutableObject<AvailableBeersState>, action: GetBeersByQueryAction) => {
	const { searchQuery } = action;
	return state.updateIn(['beers', 'searchQuery'], () => searchQuery)
		.updateIn(['beers', 'page'], () => 1);
};

const updateBeersAsFavoriteReducer = (state: ImmutableObject<AvailableBeersState>, action: UpdateBeersAsFavoriteAction) => {
	const { beersToUpdate } = action;
	let newState = state;
	beersToUpdate.forEach(({ beerId, favorite }: { beerId: number; favorite: boolean }) => {
		const { beers: { data } } = newState;
		const beerIndex = data.findIndex((beer: Beer) => beer.id === beerId);
		if (beerIndex >= 0) {
			const beer = data[beerIndex].updateIn(['isFavorite'], () => favorite);
			newState = newState.updateIn(['beers', 'data', beerIndex], () => beer);
		}
	});
	return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<any, any>(initialState, {
	[AvailableBeersTypes.SET_BEERS]: setBeersReducer,
	[AvailableBeersTypes.UPDATE_BEER_AS_FAVORITE]: updateBeersAsFavoriteReducer,
	[AvailableBeersTypes.GET_BEERS_BY_QUERY]: getBeersByQueryReducer,
});

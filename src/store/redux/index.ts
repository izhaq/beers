/* eslint @typescript-eslint/no-var-requires: "off" */
import { combineReducers, Reducer } from 'redux';
import { BeerState } from './beers';

export interface ApplicationState {
	beers: BeerState,
}

/* Create root reducer, containing all features of the application */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	beers: combineReducers<BeerState>({
		availableBeers: require('./beers/availableBeers').reducer,
		favoriteBeers: require('./beers/favoriteBeers').reducer,
	}),
});

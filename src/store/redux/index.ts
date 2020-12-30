/* eslint @typescript-eslint/no-var-requires: "off" */
import { CounterState } from '../counter/interfaces';
import { BeersState } from './beers/interfaces';
import { combineReducers, Reducer } from 'redux';

export interface ApplicationState {
	counter: CounterState,
	beers: BeersState
}

/* Create root reducer, containing all features of the application */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	counter: require('../counter').reducer,
	beers: require('./beers').reducer,
});

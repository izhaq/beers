/* eslint @typescript-eslint/no-var-requires: "off" */
import { BeersState } from './beers/interfaces';
import { combineReducers, Reducer } from 'redux';

export interface ApplicationState {
	beers: BeersState
}

/* Create root reducer, containing all features of the application */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	beers: require('./beers').reducer,
});

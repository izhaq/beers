import {
	all, takeLatest, fork, call, put, select,
} from 'redux-saga/effects';
import { Beers } from 'store/redux/beers/availableBeers/interfaces';
import beerActions, { availableBeersSelector, AvailableBeersTypes } from 'store/redux/beers/availableBeers';
import api from 'requests';
import { AxiosResponse } from 'axios';
import { Beer } from 'store/redux/beers/interfaces';
import { favoriteBeersSelector } from 'store/redux/beers/favoriteBeers';
import { mergeArrays, resetBeerData } from './manager';

function* getBeers() {
	const {
		pageSize, page, data, searchQuery,
	}: Beers = yield select(availableBeersSelector.beers);
	const favorites = yield select(favoriteBeersSelector.beers);
	const foodQuery = searchQuery ? `&food=${searchQuery}` : '';
	const response: AxiosResponse<Array<Beer>> = yield call(api.getBeers, page, pageSize, foodQuery);
	const originalData = resetBeerData(page, searchQuery, response.data) ? [] : data;
	const mergedBeers = mergeArrays('id', originalData.concat(response.data || []), favorites);
	const sortedByNameBeers = mergedBeers.sort((beer, otherBeer) => (beer.name > otherBeer.name ? 1 : -1));
	yield put(beerActions.setBeers(sortedByNameBeers, response.data.length > 0));
}

function* watchGetBeers() {
	yield takeLatest(AvailableBeersTypes.GET_BEERS, getBeers);
}

function* watchGetBeersByQuery() {
	yield takeLatest(AvailableBeersTypes.GET_BEERS_BY_QUERY, getBeers);
}

function* beersSaga() {
	yield all([
		fork(watchGetBeers),
		fork(watchGetBeersByQuery),
	]);
}

export default beersSaga;

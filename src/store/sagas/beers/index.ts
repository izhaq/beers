import {
	all, takeLatest, fork, call, put, select,
} from 'redux-saga/effects';
import { GetBeersAction } from '../../redux/beers/availableBeers/interfaces';
import beerActions, { beersSelector, BeersTypes } from '../../redux/beers/availableBeers';
import api from '../../../requests';
import { AxiosResponse } from 'axios';
import { BaseBeer, Beer } from '../../redux/beers/interfaces';

function* getBeers(action: GetBeersAction) {
	const { searchQuery } = action;
	const { pageSize, page: currentPage } = yield select(beersSelector.beers);
	const page = searchQuery ? 1 : currentPage;
	const foodQuery = searchQuery ? `&food=${searchQuery}` : '';
	const response: AxiosResponse<Array<BaseBeer>> = yield call(api.getBeers, page, pageSize, foodQuery);
	const availableBeers: Array<Beer> = response.data.map((beer) => ({
		...beer, isFavorite: false, ranking: 0,
	}));
	yield put(beerActions.setBeers(availableBeers, !!searchQuery));
}

function* watchGetBeers() {
	yield takeLatest(BeersTypes.GET_BEERS, getBeers);
}

function* beersSaga() {
	yield all([
		fork(watchGetBeers),
	]);
}

export default beersSaga;

import {
	all, takeLatest, fork, call, put, select,
} from 'redux-saga/effects';
import { Beer, GetBeersAction } from '../../redux/beers/interfaces';
import beerActions, { beersSelector, BeersTypes } from '../../redux/beers';
import api from '../../../requests';
import { AxiosResponse } from 'axios';

function* getBeers(action: GetBeersAction) {
	const { searchQuery } = action;
	const { pageSize, page: currentPage } = yield select(beersSelector.beers);
	const page = searchQuery ? 1 : currentPage;
	const foodQuery = searchQuery ? `&food=${searchQuery}` : '';
	const response: AxiosResponse<Array<Beer>> = yield call(api.getBeers, page, pageSize, foodQuery);
	yield put(beerActions.setBeers(response.data, !!searchQuery));
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

import {
	all, takeLatest, fork, call, put, select,
} from 'redux-saga/effects';
import { GetBeersAction } from 'store/redux/beers/availableBeers/interfaces';
import beerActions, { availableBeersSelector, AvailableBeersTypes } from 'store/redux/beers/availableBeers';
import api from 'requests';
import { AxiosResponse } from 'axios';
import { BaseBeer, Beer } from 'store/redux/beers/interfaces';
import { favoriteBeersSelector } from 'store/redux/beers/favoriteBeers';

function* getBeers(action: GetBeersAction) {
	const { searchQuery } = action;
	const { pageSize, page: currentPage } = yield select(availableBeersSelector.beers);
	const favorites = yield select(favoriteBeersSelector.beers);
	const page = searchQuery ? 1 : currentPage;
	const foodQuery = searchQuery ? `&food=${searchQuery}` : '';
	const response: AxiosResponse<Array<BaseBeer>> = yield call(api.getBeers, page, pageSize, foodQuery);

	const availableBeers = response.data.map((beer: BaseBeer) => {
		const fBeer = favorites.filter((favorite: Beer) => beer.id === favorite.id);
		return fBeer.isEmpty ? { ...beer, isFavorite: true, ranking: fBeer.ranking }
			: { ...beer, isFavorite: false, ranking: 0 };
	});
	yield put(beerActions.setBeers(availableBeers, !!searchQuery));
}

function* watchGetBeers() {
	yield takeLatest(AvailableBeersTypes.GET_BEERS, getBeers);
}

function* beersSaga() {
	yield all([
		fork(watchGetBeers),
	]);
}

export default beersSaga;

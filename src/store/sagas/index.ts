import { fork, all } from 'redux-saga/effects';
import beersSaga from './beers';

export default function* () {
	yield all([fork(beersSaga)]);
}

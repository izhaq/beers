import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './store/sagas';
import { rootReducer } from './store/redux';

const sagaMiddleware = createSagaMiddleware();
const devTool = composeWithDevTools({});

/* -------- create the store with middleware ---------- */
const createStoreWithMiddleware = devTool(applyMiddleware(sagaMiddleware))(createStore);

const store = createStoreWithMiddleware(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;

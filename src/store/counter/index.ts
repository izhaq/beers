import { ApplicationState } from '../redux';
import { CounterActionTypes, ActionTypes, CounterState } from './interfaces';

const initialState: CounterState = {
	count: 0,
};

export const reducer = (state = initialState, action: CounterActionTypes) => {
	switch (action.type) {
		case ActionTypes.INCREMENT_COUNTER:
			return { ...state, count: state.count + 1 };
		case ActionTypes.DECREMENT_COUNTER:
			return { ...state, count: state.count - 1 };
		default:
			return state;
	}
};

export const getCountValueSelector = (state: ApplicationState) => state.counter.count;

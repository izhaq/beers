import { Action } from 'redux';

export interface CounterState {
	count: number
}

export enum ActionTypes {
	INCREMENT_COUNTER = 'INCREMENT_COUNTER',
	DECREMENT_COUNTER = 'DECREMENT_COUNTER',
}

type IncrementCounterAction = Action<ActionTypes.INCREMENT_COUNTER>;

type DecrementCounterAction = Action<ActionTypes.DECREMENT_COUNTER>;

export type CounterActionTypes = IncrementCounterAction | DecrementCounterAction;

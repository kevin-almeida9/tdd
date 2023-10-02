import {combineReducers} from 'redux';

export const reducers = {};

const rootReducer = combineReducers(reducers);

export default rootReducer;
export type StateType = ReturnType<typeof rootReducer>;

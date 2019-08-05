import { createStore, combineReducers } from 'redux';

const initialState = {
    count: 0
};

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        default:
            return state;
    }
}

const Reducer = combineReducers({
    Counter: counterReducer
})

export const storeInstance = createStore(Reducer);
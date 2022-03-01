import {
    GET_STATES
} from '../actions/types';

const initialState = {
    error: null,
    http_status: 200,
    data: null,
};

const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATES:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};

export default stateReducer;



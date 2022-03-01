import {
    GET_CITIES
} from '../actions/types';

const initialState = {
    error: null,
    http_status: 200,
    city: null,
};

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CITIES:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};

export default cityReducer;



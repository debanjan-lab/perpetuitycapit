import {
    AUTH_LOGIN_START,
    AUTH_LOGIN_DATA,
    AUTH_LOGIN_HTTP_STATUS,
    AUTH_LOGOUT,
    AUTH_REGISTER_DATA,
    AUTH_REGISTER_HTTP_STATUS
} from '../actions/types';

const initialState = {
    error: null,
    http_status: 200,
    api_token: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_START:
            return { state }
        case AUTH_LOGIN_DATA:
            return { ...state, ...action.payload }
        case AUTH_LOGIN_HTTP_STATUS:
            return { ...state, http_status: 400 }
        case AUTH_REGISTER_DATA:
            return { ...state, ...action.payload }
        case AUTH_REGISTER_HTTP_STATUS:
            return { ...state, http_status: 400 }
        case AUTH_LOGOUT:
            return { ...state, ...initialState }
        default:
            return state;
    }
};

export default authReducer;



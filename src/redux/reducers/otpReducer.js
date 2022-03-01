import {
    AUTH_OTP_DATA,
    AUTH_OTP_HTTP_STATUS
} from '../actions/types';

const initialState = {
    error: null,
    http_status: 200,
    token: null,
};

const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_OTP_DATA:
            return { ...state, ...action.payload }
        case AUTH_OTP_HTTP_STATUS:
            return { ...state, http_status: 400 }
        default:
            return state;
    }
};

export default otpReducer;



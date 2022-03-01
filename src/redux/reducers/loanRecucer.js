import {
    GET_APPLY_LOAN_DATA,
    CLEAR_APPLY_LOAN_DATA
} from '../actions/types';

const initialState = {
    error: null,
    http_status: 200,
    apply_loan_data: null,
};

const loanReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPLY_LOAN_DATA:
            return { ...state, ...action.payload }

        case CLEAR_APPLY_LOAN_DATA:
            return { ...state, ...initialState }



        default:
            return state;
    }
};

export default loanReducer;



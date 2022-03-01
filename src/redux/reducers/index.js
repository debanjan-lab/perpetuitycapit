import { combineReducers } from 'redux';
import authReducer from './authReducer';
import otpReducer from './otpReducer';
import stateReducer from './stateReducer';
import cityReducer from './cityReducer';
import loanRecucer from './loanRecucer';
const reducer = combineReducers({
    auth: authReducer,
    otp: otpReducer,
    states: stateReducer,
    cities: cityReducer,
    loan: loanRecucer
});
export default reducer;
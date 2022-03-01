import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../configs';
import {
    AUTH_OTP_DATA,
    AUTH_OTP_HTTP_STATUS
} from './types';

export const doCheckOtp = (payload) => async (dispatch) => {
    let url = `${BASE_URL}Auth/send-otp`;
    try {
        const request = await axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        if (request) {
            console.log("====doCheckOtp======", request)
            dispatch({ type: AUTH_OTP_DATA, payload: request?.data })
        }
    } catch (err) {
        //console.log("err=========", err.response)
        dispatch({ type: AUTH_OTP_HTTP_STATUS })
    }
}

export const resendOtp = (payload) => {
    return new Promise((resolve) => {
        //console.log("payload", payload)
        const url = `${BASE_URL}Auth/resend-otp`;
        //console.log(url)
        const request = axios({
            method: 'POST',
            url: url,
            data: payload,
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return request.then(
            response => {
                //console.log("response", response)
                resolve(response.data);
            },
            err => {

                // console.log("err===((", err.response)
            }
        );
    })
}

import axios from 'axios';
import { BASE_URL } from '../../configs';
import {
    GET_APPLY_LOAN_DATA,
    CLEAR_APPLY_LOAN_DATA
} from './types';




export const saveLoan = (payload) => async (dispatch) => {
    let last_url = null;

    if (payload.step == 1) {
        last_url = 'save-step-one'
    } else if (payload.step == 2) {
        last_url = 'save-step-two'
    } else if (payload.step == 3) {
        last_url = 'save-step-three'
    } else if (payload.step == 4) {
        last_url = 'save-step-four'
    } else if (payload.step == 5) {
        last_url = 'save-step-five'
    } else if (payload.step == 6) {
        last_url = 'save-step-six'
    } else if (payload.step == 7) {
        last_url = 'save-step-final'
    }
    let url = `${BASE_URL}Auth/${last_url}`;
    console.log("url", url)
    try {
        const request = await axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        if (request) {
            console.log("request", request)
            dispatch({ type: GET_APPLY_LOAN_DATA, payload: request?.data })
        }
    } catch (err) {
    }
}

export const saveLoanFinal = (payload, token) => async (dispatch) => {
    let url = `${BASE_URL}Auth/save-step-final`;
    console.log("url", url)
    try {
        const request = await axios.post(url, payload, {
            headers: {
                'Content-type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        if (request) {
            console.log("request", request)
            dispatch({ type: GET_APPLY_LOAN_DATA, payload: request?.data })
        }
    } catch (err) {

        console.log("err", err.response)
    }
}


export const finalApplyLoan = (payload) => {
    return new Promise((resolve) => {
        //console.log("payload", payload)
        const url = `${BASE_URL}Auth/apply-loan`;
        //console.log(url)
        const request = axios({
            method: 'POST',
            url: url,
            data: payload,
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        return request.then(
            response => {
                console.log("response", response)
                resolve(response.data);
            },
            err => {
                console.log("err===((", err.response)
            }
        );
    })
}



export const getTemporaryLoan = (payload) => {
    return new Promise((resolve) => {
        //console.log("payload", payload)
        const url = `${BASE_URL}Auth/incomplete-loan`;
        //console.log(url)
        const request = axios({
            method: 'POST',
            url: url,
            data: payload,
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        return request.then(
            response => {
                // console.log("response", response)
                resolve(response.data);
            },
            err => {

                // console.log("err===((", err.response)
            }
        );
    })
}



export const getLoanDetails = (payload) => async (dispatch) => {
    let url = `${BASE_URL}Auth/loan-details`;
    console.log("url", url)
    try {
        const request = await axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        if (request) {
            console.log("request", request)
            dispatch({ type: GET_APPLY_LOAN_DATA, payload: request?.data })
        }
    } catch (err) {
    }
}

export const getAppliedLoan = (payload) => {
    return new Promise((resolve) => {
        console.log("payload", payload)
        const url = `${BASE_URL}Auth/applied-loan`;
        console.log(url)
        console.log(payload.token)
        const request = axios({
            method: 'POST',
            url: url,
            data: payload,
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        return request.then(
            response => {
                // console.log("response", response)
                resolve(response.data);
            },
            err => {

                // console.log("err===((", err.response)
            }
        );
    })
}


export const getApprovedLoan = (payload) => {
    return new Promise((resolve) => {
        //console.log("payload", payload)
        const url = `${BASE_URL}Auth/approved-loan`;
        console.log(url)
        const request = axios({
            method: 'POST',
            url: url,
            data: payload,
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        return request.then(
            response => {
                // console.log("response", response)
                resolve(response.data);
            },
            err => {

                // console.log("err===((", err.response)
            }
        );
    })
}

export const clearApplyLoan = () => async (dispatch) => {

    dispatch({ type: CLEAR_APPLY_LOAN_DATA, payload: null })

}
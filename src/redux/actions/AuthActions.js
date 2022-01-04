import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../configs';
import {
    AUTH_LOGIN_DATA,
    AUTH_LOGIN_HTTP_STATUS,
    AUTH_LOGOUT,
    AUTH_REGISTER_DATA,
    AUTH_REGISTER_HTTP_STATUS
} from './types';


export const doLogin = (payload) => async (dispatch) => {
    let url = `${BASE_URL}Auth/login`;
    //console.log("======url====", url)
    try {
        const request = await axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        if (request) {
            // console.log("======login====", request)
            dispatch({ type: AUTH_LOGIN_DATA, payload: request?.data })
        }
    } catch (err) {
        //console.log("err=========", err.response)
        dispatch({ type: AUTH_LOGIN_HTTP_STATUS })
    }
}


export const saveUserData = (payload) => async (dispatch) => {
    const token = payload.api_token;
    await AsyncStorage.setItem('@apiToken', token).then((res) => {
        dispatch({ type: AUTH_LOGIN_DATA, payload: payload })
    })
}



export const checkAuth = () => async (dispatch) => {
    const value = await AsyncStorage.getItem('@apiToken')
    if (value !== null) {
        let obj = {
            api_token: value
        }
        dispatch({ type: AUTH_LOGIN_DATA, payload: obj })
    } else {
        dispatch({ type: AUTH_LOGOUT })
    }
}


export const doLogout = () => async (dispatch) => {

    await AsyncStorage.removeItem('@apiToken').then((res) => {
        dispatch({ type: AUTH_LOGOUT })
    })



}


export const doRegister = (payload) => async (dispatch) => {
    let url = `${BASE_URL}Auth/registration`;
    try {
        const request = await axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        if (request) {
            // console.log("==========", request)
            dispatch({ type: AUTH_REGISTER_DATA, payload: request?.data })
        }
    } catch (err) {
        //console.log("err=========", err.response)
        dispatch({ type: AUTH_REGISTER_HTTP_STATUS })
    }
}




export const getProfile = (payload) => async (dispatch) => {
    let token = payload.token;
    let url = `${BASE_URL}Auth/profile`;

    try {
        const request = await axios.get(url, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (request) {
            console.log("====profile data======", request?.data?.data)
            dispatch({ type: AUTH_REGISTER_DATA, payload: request?.data?.data })
        }
    } catch (err) {
        console.log("err=========", err.response)
        dispatch({ type: AUTH_REGISTER_HTTP_STATUS })
    }
}

export const updateProfile = (payload) => async (dispatch) => {
    let token = payload.token;
    let url = `${BASE_URL}Auth/profile-update`;

    try {
        const request = await axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (request) {
            console.log("====profile update data======", request)
        }
    } catch (err) {
        console.log("err=========", err.response)
    }
}

export const vefifyEmail = (payload) => async (dispatch) => {
    let token = payload.token;
    let url = `${BASE_URL}Auth/email-check`;
    try {
        const request = await axios.post(url, payload, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (request) {
            console.log("====profile email check======", request)
        }
    } catch (err) {
        console.log("err=========", err.response)
    }
}


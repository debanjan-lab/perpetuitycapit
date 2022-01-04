import axios from 'axios';
import { BASE_URL } from '../../configs';
import {
    GET_STATES,
} from './types';

export const getStates = (payload) => async (dispatch) => {
    let url = `${BASE_URL}Auth/get-state`;
    try {
        const request = await axios.get(url, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        if (request) {
            dispatch({ type: GET_STATES, payload: request?.data })
        }
    } catch (err) {
    }
}
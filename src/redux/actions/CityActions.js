import axios from 'axios';
import { BASE_URL } from '../../configs';
import {
    GET_CITIES,
} from './types';

export const getCities = (payload) => async (dispatch) => {
    let state_id = payload.state_id;
    let url = `${BASE_URL}Auth/get-city/${state_id}`;
    try {
        const request = await axios.get(url, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${payload.token}`
            }
        });
        if (request) {
            dispatch({ type: GET_CITIES, payload: request?.data })
        }
    } catch (err) {
    }
}
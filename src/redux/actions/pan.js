import axios from 'axios';
import { BASE_URL } from '../../configs';
import { getProfile } from '../../redux/actions/pan';

export function checkPan(payload) {
    return new Promise((resolve) => {
        //console.log("payload", payload)
        const url = `${BASE_URL}Auth/pan-number`;
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

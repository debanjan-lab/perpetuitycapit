import axios from 'axios';
import { BASE_URL } from '../../configs';


export function getEmiData(payload) {
    return new Promise((resolve) => {
        //console.log("payload", payload)
        const url = `${BASE_URL}Auth/emi-calculate`;
        console.log(url)
        const request = axios({
            method: 'GET',
            url: url,
            data: payload,
            headers: {
                "Content-Type": 'application/json',
            }
        });
        return request.then(
            response => {
                console.log("response", response)
                resolve(response.data);
            },
            err => {

                // console.log("err===((", err.response)
            }
        );
    })
}

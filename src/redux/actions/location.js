import axios from 'axios';
import { BASE_URL } from '../../configs';

const GEO_API_KEY = `AIzaSyAkhrTP14W5P8Jbz-B37FcI1qesRsB8hNA`;
const GEO_API = `https://maps.googleapis.com/maps/api/geocode/json`;

export function getGeoLoaction(payload) {
    return new Promise((resolve) => {


        let url = `${GEO_API}?latlng=${payload.latitude},${payload.longitude}&key=${GEO_API_KEY}`
        console.log(url)
        const request = axios({
            method: 'GET',
            url: url,
        });
        return request.then(
            response => {
                console.log("geo api response", response?.data?.results[0]?.formatted_address)
                resolve(response?.data?.results[0]?.formatted_address);
            },
            err => {

                // console.log("err===((", err.response)
            }
        );
    })
}

export function updateLocation(payload) {
    return new Promise((resolve) => {
        console.log("payload", payload)
        const url = `${BASE_URL}Auth/location-update`;
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
                //console.log("response", response)
                resolve(response.data);
            },
            err => {

                // console.log("err===((", err.response)
            }
        );
    })
}

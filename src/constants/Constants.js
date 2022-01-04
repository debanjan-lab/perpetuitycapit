import DeviceInfo from 'react-native-device-info';

export const API = 'https://foure.nodejsdapldevelopments.com/perpetuitycapital/public/api/v1/Auth/';
export const deviceToken = DeviceInfo.getUniqueId();
// export const accessToken = 'VVNWa2IzNU5GUGlXR2d5dFpVa3E4bGVnQTFOdW0yc2pCYkxZV3huTlExND0=';

// export const deviceToken = () => {
//     DeviceInfo.getDeviceToken().then((deviceToken) => {
//         return deviceToken;
//     });
// }
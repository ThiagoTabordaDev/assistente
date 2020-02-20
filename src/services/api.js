import axios from 'axios';
// import publicIp from 'public-ip';
import React from 'react';
import { Redirect } from 'react-router-dom';
//import history from '~/services/history';
import { signFailure } from '~/store/modules/auth/actions';

// const requestInternal = async () => {
//     const ip = await publicIp.v4();
//     console.log(ip === '187.111.20.186');
//     return ip === '187.111.20.186';
// };

const api = axios.create({
    baseURL: 'http://168.227.201.114:38383',
    /*(requestInternal() === false
        ? 'http://192.168.2.3'
        : 'http://localhost'
    ).concat(':38383'),*/
    validateStatus(status) {
        if (status >= 200 && status < 300) return true;
        if (status === 401) {
            console.log(status);
            signFailure();
            const s = window.localStorage;
            s.clear();
            //history.push('/');
            // return false
            return <Redirect to="/" />;
        }
    },
});

export default api;

import axios from './axios'
import cookie from 'react-cookies'
import { setBearerToken } from "./axios";

export default class Session {
    static authenticate(email,password, successCallback, errorCallback) {
        axios.post('/user_token',{
            auth: { email, password }
        }).then(response => {
            this.setToken(response.data.jwt);
            successCallback(response)
        }, errorCallback)
    }

    static setToken(jwt) {
        const timestamp = this.getPayload(jwt).exp * 1000
        cookie.save('jwt', jwt, {
            expires: new Date(timestamp),
            path: '/'
        })
        setBearerToken(jwt);
    }

    static getToken() {
        return cookie.load('jwt');
    }

    static getPayload( jwt = this.getToken()) {
        return jwt !== undefined ? JSON.parse(atob(jwt.split('.')[1])) : {}
    }

    static isGuest() {
        return this.getToken() === undefined;
    }

    static logout() {
        cookie.remove('jwt', { path: '/' })
    }
}
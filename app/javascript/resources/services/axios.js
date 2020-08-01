import axios from 'axios';
import Session from "./session";

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': document.head.querySelector('meta[name="csrf-token"]').content
    }
});

instance.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        Session.logout();
        window.location.href = '/login';
    }
    return Promise.reject(error);
})

export const setBearerToken = (token) => {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default instance
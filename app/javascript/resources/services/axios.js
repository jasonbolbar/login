import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': document.head.querySelector('meta[name="csrf-token"]').content
    }
});

export const setBearerToken = (token) => {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default instance
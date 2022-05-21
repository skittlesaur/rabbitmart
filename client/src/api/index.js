import axios from 'axios'

const API = axios.create({baseURL: process.env.REACT_APP_API_BASEURL});

API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const token = profile ? profile.token : null;
    if (token)
        req.headers.Authorization = `Bearer ${token}`;

    return req;
});

export const validateCart = (cart) => API.post('/products/cart', {cart});

export const authLogin = (email, password) => API.post('/auth/login', {email, password});
export const verify = () => API.post('/auth/verify');
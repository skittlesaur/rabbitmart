import axios from 'axios'

const API = axios.create({baseURL: process.env.REACT_APP_API_BASEURL});

API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const token = profile ? profile.token : null;
    if (token)
        req.headers.Authorization = `Bearer ${token}`;

    return req;
});

export const getRecommendations = () => API.get('/products/recommendations');
export const postProduct = (product) => API.post(`/products`, product);
export const validateCart = (cart) => API.post('/products/cart', {cart});

export const authLogin = (email, password) => API.post('/auth/login', {email, password});
export const verify = () => API.post('/auth/verify');
export const userUpdateWishlist = (product_id) => API.patch('/me/wishlist', {product_id});

export const fetchOrders = (page) => API.get(`/orders?page=${page}`);
export const fetchOrder = (id) => API.get(`/orders/${id}`);
export const updateOrder = (id, status) => API.patch(`/orders/${id}`, {status});

export const adminUpdateDatabase = (csv, mode) => API.patch(`/products`, {csv, mode});
import axios from 'axios'
import {ORDERS_BASEURL, PRODUCTS_BASEURL, SHIPPING_BASEURL, USER_BASEURL} from "./BaseURLs";

const API = axios.create();

API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const token = profile ? profile.token : null;
    if (token)
        req.headers.Authorization = `Bearer ${token}`;

    return req;
});

export const getRecommendations = () => API.get(`${PRODUCTS_BASEURL}/recommendations`);
export const postProduct = (product) => API.post(`${PRODUCTS_BASEURL}`, product);
export const adminUpdateDatabase = (csv, mode) => API.patch(`${PRODUCTS_BASEURL}`, {csv, mode});
export const validateCart = (cart) => API.post(`${PRODUCTS_BASEURL}/cart`, {cart});

export const authLogin = (email, password) => API.post(`${USER_BASEURL}/login`, {email, password});
export const verify = () => API.post(`${USER_BASEURL}/verify`);
export const userUpdateWishlist = (product_id) => API.patch(`${USER_BASEURL}/wishlist`, {product_id});
export const getWishlist = () => API.get(`${USER_BASEURL}/wishlist`);

export const fetchShipments = (page) => API.get(`${SHIPPING_BASEURL}?page=${page}`);
export const fetchShipment = (id) => API.get(`${SHIPPING_BASEURL}/${id}`);
export const updateShipment = (id, status) => API.patch(`${SHIPPING_BASEURL}/${id}`, {status});

export const fetchOrders = (page) => API.get(`/orders?page=${page}`);
export const fetchOrder = (id) => API.get(`/orders/${id}`);
export const updateOrder = (id, status) => API.patch(`/orders/${id}`, {status});
export const postOrder = (token, data) => API.post('/orders', {token, data});

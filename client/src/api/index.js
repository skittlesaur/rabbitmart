import axios from 'axios'

const API = axios.create({baseURL: process.env.REACT_APP_API_BASEURL});

export const validateCart = (cart) => API.post('/products/cart', {cart});

export const authLogin = (email, password) => API.post('/auth/login', {email, password});
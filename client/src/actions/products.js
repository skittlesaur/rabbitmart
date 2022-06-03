import * as api from '../api';
import {FETCH_RECOMMENDATIONS, UPDATE_DATABASE, VALIDATE_CART, VALIDATE_CART_ERR} from "../constants/actions/products";

export const getProductsPerPage = (page, category, onSuccess) => async () => {
    try {
        const products = await api.getProductsPerPage(page, category).then(res => res.data);
        onSuccess(products);
    } catch (error) {
        console.log(error);
    } 
}

export const productsSearch = (search, page, onSuccess) => async () => {
    try {
        const products = await api.productsSearch(search, page).then(res => res.data);
        onSuccess(products);
    } catch (error) {
        console.log(error);
    }
}

export const getRecommendations = (onSuccess) => async (dispatch) => {
    try {
        const data = await api.getRecommendations().then(res => res.data);
        dispatch({type: FETCH_RECOMMENDATIONS, data})
        onSuccess(data);
    } catch (e) {
        console.log(e)
    }
}

export const postProduct = (product, onSuccess, onError) => async () => {
    try {
        const data = await api.postProduct(product).then(res => res.data);
        onSuccess(data);
    } catch (e) {
        const {data} = e.response;
        onError(data);
    }
}

export const validateCart = (cart, onSuccess, onError) => async (dispatch) => {
    try {
        const cartData = await api.validateCart(cart).then(res => res.data);
        dispatch({type: VALIDATE_CART, data: cartData});
        onSuccess(cartData.token?.split('.')[1]);
    } catch (e) {
        const {data} = e.response;
        dispatch({type: VALIDATE_CART_ERR, data});
        onError(data);
    }
}

export const adminUpdateDatabase = (csv, mode, onSuccess, onError) => async (dispatch) => {
    try {
        const updatedData = await api.adminUpdateDatabase(csv, mode).then(res => res.data);
        dispatch({type: UPDATE_DATABASE, data: updatedData});
        onSuccess(updatedData);
    } catch (e) {
        onError(e);
    }
}
import * as api from '../api';
import {VALIDATE_CART, VALIDATE_CART_ERR} from "../constants/actions/products";

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

export const adminUpdateDatabase = (csv, mode, onSuccess, onError) => async () => {
    try {
        const updatedData = await api.adminUpdateDatabase(csv, mode).then(res => res.data);
        onSuccess(updatedData);
    } catch (e) {
        onError(e);
    }
}
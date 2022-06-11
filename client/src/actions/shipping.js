import * as api from "../api";
import {SHIPPING_FETCH, SHIPPING_FETCH_ALL} from "../constants/actions/shipping";

export const fetchShipments = (page, onSuccess) => async (dispatch) => {
    try {
        const shippingData = await api.fetchShipments(page).then(res => res.data);
        dispatch({type: SHIPPING_FETCH_ALL, data: shippingData});
        onSuccess();
    } catch (e) {
        console.log(e);
    }
}

export const fetchShipment = (id, onSuccess, onError) => async (dispatch) => {
    try {
        const shipmentData = await api.fetchShipment(id).then(res => res.data);
        dispatch({type: SHIPPING_FETCH, data: shipmentData})
        onSuccess(shipmentData);
    } catch (e) {
        onError(e.response.data);
    }
}

export const updateShipment = (id, status, onSuccess, onError) => async () => {
    try {
        await api.updateShipment(id, status);
        onSuccess();
    } catch (e) {
        onError(e.response.data);
    }
}
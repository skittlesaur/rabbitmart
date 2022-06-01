import * as api from "../api";
import {SHIPPING_FETCH_ALL} from "../constants/actions/shipping";

export const fetchShipments = (page, onSuccess) => async (dispatch) => {
    try {
        const shippingData = await api.fetchShipments(page).then(res => res.data);
        dispatch({type: SHIPPING_FETCH_ALL, data: shippingData});
        onSuccess();
    } catch (e) {
        console.log(e);
    }
}
import * as api from '../api/index';

export const fetchOrder = (id, onSuccess, onError) => async () => {
    try {
        const orderData = await api.fetchOrder(id);
        onSuccess(orderData.data);
    } catch (e) {
        onError(e.response.data);
    }
}

export const updateOrder = (id, status, onSuccess, onError) => async () => {
    try {
        await api.updateOrder(id, status);
        onSuccess();
    } catch (e) {
        onError(e.response.data);
    }
}
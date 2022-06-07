import * as api from '../api/index';
export const fetchShipment= (id, onSuccess, onError) => async () => {
    try {
        const shipmentdata = await api.fetchShipment(id).then(res=>res.data);
        onSuccess(shipmentdata);
    } catch (e) {
        onError(e.response.data);
    }
}
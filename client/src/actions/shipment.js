import * as api from '../api/index';
export const fetchShipment= (id, onSuccess, onError) => async () => {
    try {
        const shipmentdata = await api.fetchShipment(id).then(res=>res.data);
        console.log(shipmentdata);
        onSuccess(shipmentdata.data);
    } catch (e) {
        onError(e.response.data);
    }
}
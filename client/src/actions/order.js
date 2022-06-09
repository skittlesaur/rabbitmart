import * as api from '../api/index';
export const fetchOrder=(id, onSuccess, onError) => async () => {
    try {
        const fetchOrderdata = await api.fetchOrder(id).then(res=>res.data);
        onSuccess(fetchOrderdata);
    } catch (e) {
        onError(e.response.data);
    }
}
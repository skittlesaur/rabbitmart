import * as api from "../api";
import {LOGIN} from "../constants/actions/authentication";

export const authLogin = (email, password, onSuccess, onError) => async (dispatch) => {
    try {
        const loginData = await api.authLogin(email, password).then(res => res.data);
        dispatch({type: LOGIN, data: loginData});
        onSuccess();
    } catch (e) {
        onError(e.response.data);
    }
}
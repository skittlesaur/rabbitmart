import * as api from "../api";
import {LOGIN} from "../constants/actions/authentication";

export const authLogin = (email, password, onSuccess, onError) => async (dispatch) => {
    try {
        const loginData = await api.authLogin(email, password).then(res => res.data);
        dispatch({type: LOGIN, data: loginData});
        onSuccess();
    } catch (e) {
        onError(e.response ? e.response.data : {message: "Server Error"});
    }
}

export const verifyUser = (onSuccess, onError) => async () => {
    console.log(1)
    try {
        const verificationData = await api.verify().then(res => res.data);
        onSuccess(verificationData);
    } catch (e) {
        onError();
    }
}
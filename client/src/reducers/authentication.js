import {LOGIN, LOGOUT} from "../constants/actions/authentication";

let profile = JSON.parse(localStorage.getItem('profile'));

const initialState = {
    user: profile?.user,
    token: profile?.token
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify(action.data));
            return {...state, user: action.data?.user, token: action.data?.token};
        case LOGOUT:
            localStorage.removeItem('profile');
            return {};
        default:
            return state;
    }
}

export default reducer;
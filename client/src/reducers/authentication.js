import {LOGIN} from "../constants/actions/authentication";

const reducer = (state = [], action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify(action.data));
            return {...state, profile: action.data};
        default:
            return state;
    }
}

export default reducer;
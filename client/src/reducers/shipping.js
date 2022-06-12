import {SHIPPING_FETCH, SHIPPING_FETCH_ALL} from "../constants/actions/shipping";

const initialOrders = {
    all: []
}

const reducer = (state = initialOrders, action) => {
    switch (action.type) {
        case SHIPPING_FETCH:
            return {...state, fetched: action.data}
        case SHIPPING_FETCH_ALL:
            return {...state, all: action.data}
        default:
            return state;
    }
}

export default reducer;
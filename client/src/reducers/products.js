import {FETCH_RECOMMENDATIONS, UPDATE_DATABASE, VALIDATE_CART, VALIDATE_CART_ERR} from "../constants/actions/products";

const reducer = (products = [], action) => {
    switch (action.type) {
        case FETCH_RECOMMENDATIONS:
            return {...products, recommendations: action.data}
        case VALIDATE_CART:
            return {...products, cart_validation: action.data};
        case VALIDATE_CART_ERR:
            return {...products, cart_validation: {valid: false, error: action.data}}
        case UPDATE_DATABASE:
            return {...products, updated: action.data};
        default:
            return products;
    }
}

export default reducer;
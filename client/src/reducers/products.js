import {VALIDATE_CART, VALIDATE_CART_ERR} from "../constants/actions/products";

const reducer = (products = [], action) => {
    switch (action.type) {
        case VALIDATE_CART:
            return {...products, cart_validation: action.data};
        case VALIDATE_CART_ERR:
            return {...products, cart_validation: {valid: false, error: action.data}}
        default:
            return products;
    }
}

export default reducer;
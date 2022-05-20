import styles from './cart.module.css';
import CartItem from "../../components/cart-item/CartItem";
import {Link} from "react-router-dom";

const Cart = ({cart, cartCount, updateQuantity}) => {

    const getTotal = () => {
        let total = 0;
        for (const cartElement of cart) {
            total += cartElement.price * cartElement.quantity;
        }
        return total;
    }

    if (cart && !cart.length)
        return (
            <div className={styles['wrapper']}>
                <div className={'heading'}>
                    <h1>Shopping Cart</h1>
                </div>
                <div className={styles['no-items']}>Your cart is empty</div>
                <Link to={'/products'} className={'btn1'}>Start Shopping</Link>
            </div>
        )

    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>Shopping Cart</h1>
            </div>
            <div className={styles['products-wrapper']}>
                {cart.map((product, i) => <CartItem product={product} updateQuantity={updateQuantity} key={i}/>)}
            </div>
            <div className={styles['total-wrapper']}>
                <div className={styles['total-text']}>Total ({cartCount} Items):</div>
                <div className={styles['total-amount']}>{getTotal()} EGP</div>
            </div>
            <Link to={'/checkout'} className={`btn1`}>Checkout</Link>
        </div>
    );
}

export default Cart;
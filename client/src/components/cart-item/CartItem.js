import styles from './cartItem.module.css';

const CartItem = ({product, updateQuantity, edit = true, id = false}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['img-wrapper']}>
                <img src={product.image} alt={product.name}/>
            </div>
            <div className={styles['info']}>
                <div className={styles['title']}>{product.name}</div>
                <div className={styles['weight']}>{parseInt(product.weight) * parseInt(product.quantity || '1')}{product.measurement}</div>
                <div className={styles['quantity-wrapper']}>
                    {id && <div className={styles['quantity']}>#{product.product_id}</div>}
                    <div className={styles['quantity']}>{product.quantity? `Quantity: ${product.quantity}` : `Stock:  ${product.stock}`}</div>
                    {edit && <>
                        <div onClick={() => updateQuantity(product, 'ADD')}
                             className={`${styles['btn']} ${styles['add']}`}>+
                        </div>
                        <div onClick={() => updateQuantity(product, 'REMOVE')}
                             className={`${styles['btn']} ${styles['remove']}`}>-
                        </div>
                    </>}
                </div>
            </div>
            <div className={styles['price']}>
                <div className={styles['total-price']}>{parseInt(product.price) * parseInt(product.quantity || '1')} EGP</div>
                {parseInt(product.quantity) > 1 && <div
                    className={styles['unit-price']}>{product.price} EGP/{product.weight}{product.measurement}</div>}
            </div>
        </div>
    );
}

export default CartItem;
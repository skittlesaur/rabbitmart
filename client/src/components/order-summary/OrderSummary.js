import styles from './orderSummary.module.css';

const OrderSummary = ({order}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <div className={styles['left-wrapper']}>
                    <div className={styles['customer-first']}>{order.name.first}</div>
                    <div className={styles['customer']}>{order.name.last}</div>
                </div>
                <div className={styles['id']}>#{order.order_id}</div>
            </div>
            <div className={styles['content']}>
                {order.products.map((product, i) =>
                    <div key={i} className={styles['product-wrapper']}>
                        <div className={styles['product-img']}>
                            <img src={product.image} alt={product.name}/>
                        </div>
                        <div className={styles['quantity']}>{product.price}EGP x{product.quantity || 1}</div>
                        <div className={styles['product-name']}>{product.name}</div>
                    </div>
                )}
            </div>
            <div className={styles['footer']}>
                <div className={styles['total-wrapper']}>
                    <div className={styles['total-txt']}>Total</div>
                    <div className={styles['total']}>{order.total} EGP</div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
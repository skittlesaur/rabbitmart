import OrderShort from "../order-short/OrderShort";
import styles from './ordersList.module.css';

const OrdersList = ({orders}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <div className={styles['id']}>ID</div>
                <div className={styles['name']}>Customer</div>
                <div className={styles['items']}>Items</div>
                <div className={styles['total']}>Total</div>
                <div className={styles['status']}>Status</div>
            </div>
            {orders.map((order, i) => <OrderShort order={order} key={i}/>)}
        </div>
    );
}

export default OrdersList;
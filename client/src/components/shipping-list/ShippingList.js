import styles from './shippingList.module.css';
import ShippingShort from "../shipping-short/ShippingShort";

const ShippingList = ({shipments}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <div className={styles['id']}>ID</div>
                <div className={styles['items']}>Address</div>
                <div className={styles['total']}>Total</div>
                <div className={styles['status']}>Status</div>
            </div>
            {shipments.map((order, i) => <ShippingShort shipping={order} key={i}/>)}
        </div>
    );
}

export default ShippingList;
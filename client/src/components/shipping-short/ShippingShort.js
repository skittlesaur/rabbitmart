import styles from './shippingShort.module.css';
import {useNavigate} from "react-router-dom";

const ShippingShort = ({shipping}) => {

    const navigate = useNavigate();

    if (!shipping)
        return;

    const formatStatus = () => {
        const st = shipping.status;
        return st.charAt(0).toUpperCase() + st.slice(1).toLowerCase();
    }

    return (
        <div onClick={() => navigate(`/admin/orders/${shipping.order_id}`)} className={styles['wrapper']}>
            <div className={styles['id']}>{shipping.order_id}</div>
            <div className={styles['id']}>{shipping.address.area}, {shipping.address.city}</div>
            <div className={styles['total']}>{shipping.total.toFixed(2)}</div>
            <div onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/shipping/update?id=${shipping.order_id}`);
            }}
                 className={`${styles['status']} ${styles[shipping.status]}`}>{formatStatus()}</div>
        </div>
    );
}

export default ShippingShort;
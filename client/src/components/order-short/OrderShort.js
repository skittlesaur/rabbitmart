import styles from './orderShort.module.css';
import {useNavigate} from "react-router-dom";

const OrderShort = ({order, orderPage = ''}) => {

    const navigate = useNavigate();

    if (!order)
        return;

    const formatStatus = () => {
        const st = order.status;
        return st.charAt(0).toUpperCase() + st.slice(1).toLowerCase();
    }

    return (
        <div onClick={() => navigate(orderPage + `${order.order_id}`)} className={styles['wrapper']}>
            <div className={styles['id']}>{order.order_id}</div>
            <div className={styles['name']}>{order.name.first} {order.name.last}</div>
            <div className={styles['items']}>{order.products.length}</div>
            <div className={styles['total']}>{order.total.toFixed(2)}</div>
            <div onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/orders/update?id=${order.order_id}`);
            }}
                 className={`${styles['status']} ${styles[order.status]}`}>{formatStatus()}</div>
        </div>
    );
}

export default OrderShort;
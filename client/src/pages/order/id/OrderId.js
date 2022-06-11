import styles from './orderId.module.css';
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../components/loading/Loading";
import Order from '../../../shared/assets/tracking/order.png';
import {fetchOrder} from "../../../actions/orders";

const OrderId = () => {

    const {id} = useParams();
    const order = useSelector(state => state.orders.fetched);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const onSuccess = () => {
            setLoading(false);
        }

        const onError = (e) => {
            setLoading(false);
            navigate('/404')
        }

        if (order && order.order_id === id)
            onSuccess();
        else
            dispatch(fetchOrder(id, onSuccess, onError))

    }, []);

    const capitalizeFirst = (m) => {
        return m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
    }

    const getProgress = () => {
        switch (order?.status) {
            case 'PROCESSING':
                return 50;
            case 'FULFILLED':
                return 100;
            default:
                return 5
        }
    }

    if (loading)
        return <Loading/>

    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>Track Order</h1>
            </div>
            <div className={styles['sub']}>
                Order <span>#{order.order_id}</span>
            </div>
            <div className={styles['full-progress']}>
                <div className={styles['progress']} style={{width: getProgress() + '%'}}>
                    <img className={styles['img']}
                         style={{transform: order.status === 'CANCELLED' ? 'scaleX(-1)' : ''}} src={Order}
                         alt={'Order'}/>
                </div>
            </div>
            <div className={styles['status']}>
                <span className={styles['update']}>Order Update:</span> Your order has
                been {capitalizeFirst(order.status)}.
            </div>
            {order.status === 'FULFILLED' &&
                <Link className={styles['shipping']} to={`/shipping/${order.order_id}`}>Track Shipping</Link>}
        </div>
    );
}

export default OrderId;
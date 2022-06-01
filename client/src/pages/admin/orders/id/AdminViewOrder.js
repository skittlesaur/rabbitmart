import styles from './adminViewOrder.module.css';
import OrderSummary from "../../../../components/order-summary/OrderSummary";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchOrder} from "../../../../actions/orders";
import Loading from "../../../../components/loading/Loading";

const AdminViewOrder = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const onSuccess = (order) => {
            setOrder(order);
            setLoading(false);
        }

        dispatch(fetchOrder(id, onSuccess))
    }, [id,dispatch])

    if (loading)
        return <Loading/>

    return (
        <div className={styles['wrapper']}>
            {<OrderSummary order={order}/>}
            <div className={styles['btns']}>
                <Link to={'/admin/orders'} className={'btn1'}>View All Orders</Link>
                <Link to={`/admin/orders/update?id=${id}`} className={'btn2'}>Edit Order Status</Link>
            </div>
        </div>
    );
}

export default AdminViewOrder;
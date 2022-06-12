import styles from './adminOrders.module.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "../../../../actions/orders";
import Loading from "../../../../components/loading/Loading";
import OrdersList from "../../../../components/orders-list/OrdersList";
import Pages from "../../../../components/pages/Pages";
import {useLocation, useNavigate} from "react-router-dom";

const AdminOrders = () => {

    const data = useSelector(state => state.orders.all)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        const query = new URLSearchParams(location.search);
        const page = query.get('page') || 1;
        setPage(Number(page));

        dispatch(fetchOrders(page, () => setLoading(false)))
        window.scrollTo(0, 0);
    }, [dispatch, location.search])

    const onPageClick = (page) => {
        navigate(`/admin/orders?page=${page}`)
    }

    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>All Orders</h1>
            </div>
            {loading ? <Loading/> : <OrdersList orders={data.orders}/>}
            {<Pages max={data.total_pages} current={page} onPageClick={onPageClick}/>}
        </div>
    );
}

export default AdminOrders;
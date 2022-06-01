import styles from './adminShipping.module.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../../components/loading/Loading";
import Pages from "../../../../components/pages/Pages";
import {useLocation, useNavigate} from "react-router-dom";
import ShippingList from "../../../../components/shipping-list/ShippingList";
import {fetchShipments} from "../../../../actions/shipping";

const AdminShipping = () => {

    const data = useSelector(state => state.shipping.all)
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

        dispatch(fetchShipments(page, () => setLoading(false)))
        window.scrollTo(0, 0);
    }, [dispatch, location.search])

    const onPageClick = (page) => {
        navigate(`/admin/shipping?page=${page}`)
    }

    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>All Shipments</h1>
            </div>
            {loading ? <Loading/> : <ShippingList shipments={data.shipments}/>}
            {<Pages max={data.total_pages} current={page} onPageClick={onPageClick}/>}
        </div>
    );
}

export default AdminShipping;
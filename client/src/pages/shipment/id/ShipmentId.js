import styles from './shipmentId.module.css';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../components/loading/Loading";
import {fetchShipment} from "../../../actions/shipping";
import Delivery from '../../../shared/assets/tracking/delivery.png';

const ShipmentId = () => {

    const {id} = useParams();
    const shipment = useSelector(state => state.shipping.fetched);
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

        if (shipment && shipment.order_id === id)
            onSuccess();
        else
            dispatch(fetchShipment(id, onSuccess, onError))

    }, []);

    const capitalizeFirst = (m) => {
        return m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
    }

    const getProgress = () => {
        switch (shipment?.status) {
            case 'SHIPPED':
                return 50;
            case 'DELIVERED':
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
                <h1>Track Shipping</h1>
            </div>
            <div className={styles['sub']}>
                Order <span>#{shipment.order_id}</span>
            </div>
            <div className={styles['full-progress']}>
                <div className={styles['progress']} style={{width: getProgress() + '%'}}>
                    <img className={styles['img']}
                         style={{transform: shipment.status === 'RETURNED' ? 'scaleX(-1)' : ''}} src={Delivery}
                         alt={'Delivery'}/>
                </div>
            </div>
            <div className={styles['status']}>
                <span className={styles['update']}>Delivery Update:</span> Your order has
                been {capitalizeFirst(shipment.status)}.
            </div>
        </div>
    );
}

export default ShipmentId;
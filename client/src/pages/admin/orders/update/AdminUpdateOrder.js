import styles from './adminUpdateOrder.module.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchOrder, updateOrder} from "../../../../actions/orders";
import Loading from "../../../../components/loading/Loading";
import OrderSummary from "../../../../components/order-summary/OrderSummary";

import SuccessImage from '../../../../shared/assets/state/success.png';
import WarningImage from '../../../../shared/assets/state/warning.png';
import Error from "../../../../components/feedback/error/Error";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const INPUT = 0;
const ORDER_VIEW = 1;
const SUCCESS = 2;
const FAILURE = 3;

const AdminUpdateOrder = () => {

    const [state, setState] = useState(INPUT);
    const [id, setId] = useState("");
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const options = ['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELLED'];
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get('id');

        if (id) {
            setId(id);
        }
    }, [location.search])

    const handleFind = () => {
        setLoading(true);

        const onSuccess = (order) => {
            setOrder(order);
            setState(ORDER_VIEW);
            setStatus(order.status);
            setLoading(false);
        }

        const onError = (e) => {
            setLoading(false);
            setError(e.message)
        }

        dispatch(fetchOrder(id.toUpperCase(), onSuccess, onError));
    }

    const handleConfirm = () => {
        setLoading(true);

        const onSuccess = () => {
            setState(SUCCESS);
            setLoading(false);
        }

        const onError = (e) => {
            setState(FAILURE);
            setFailureMessage(e.message);
            setLoading(false)
        }

        dispatch(updateOrder(order.order_id, status, onSuccess, onError));
    }

    const handleReset = () => {
        setLoading(true);
        setId("");
        setOrder({});
        setStatus("");
        setFailureMessage("");
        setError("");
        setState(INPUT);
        setLoading(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [state])

    return (
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
            {loading && <Loading
                text={state === INPUT ? 'Fetching Database' : (state === ORDER_VIEW ? 'Updating Database' : 'Loading')}
                overlay={true}/>}
            <div className={'heading'}>
                <h1>Update Order Status</h1>
            </div>
            {(state === INPUT || state === ORDER_VIEW) &&
                <div className={'warning-box'}><span className={'warning'}>Warning:</span> The order status cannot be
                    rolled back to a previous
                    state after it has been modified.</div>}
            {state === INPUT &&
                <div className={styles['wrapper2']}>
                    <input className={styles['input']} onChange={(e) => setId(e.target.value.toUpperCase())} value={id}
                           maxLength={6}
                           placeholder={'Order Id'}/>
                    <div onClick={handleFind} className={'btn1'}>Find</div>
                </div>
            }
            {state === ORDER_VIEW &&
                <div className={styles['wrapper2']}>
                    <OrderSummary order={order}/>
                    <div className={styles['options-wrapper']}>
                        <div className={styles['status']}>Status</div>
                        <select defaultValue={order.status} onChange={(e) => setStatus(e.target.value)}>
                            {options.map((option, i) =>
                                <option
                                    value={option}
                                    key={i}
                                    disabled={options.indexOf(option) < options.indexOf(order.status)}>{option}</option>)}
                        </select>
                    </div>
                    <div onClick={handleConfirm} className={'btn1'}>Confirm Update</div>
                </div>}
            {state === SUCCESS &&
                <div className={styles['response-wrapper']}>
                    <img src={SuccessImage} alt={'Successfully Updated'}/>
                    <p>Order #{order.order_id} was successfully updated.</p>
                    <div className={'btn2'} onClick={handleReset}>Update More</div>
                </div>}
            {state === FAILURE &&
                <div className={styles['response-wrapper']}>
                    <img src={WarningImage} alt={'Successfully Updated'}/>
                    <p>Failed to update order #{id}. {failureMessage}</p>
                    <div className={'btn2'} onClick={handleReset}>Retry</div>
                </div>}
        </div>
    );
}

export default AdminUpdateOrder;
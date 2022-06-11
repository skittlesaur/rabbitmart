import styles from './order.module.css';
import {useState, useRef} from "react";
import {useDispatch} from "react-redux";
import Error from "../../components/feedback/error/Error";
import {useNavigate} from "react-router-dom";
import {fetchOrder} from "../../actions/orders";

const Order = () => {

    const dispatch = useDispatch();
    const inputRef = useRef();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFetch = () => {

        if (inputRef.current.value.length !== 6)
            return setError('Enter a valid order id');

        const onSuccess = (shipment) => {
            navigate(`/orders/${shipment.order_id}`)
        }

        const onError = (e) => {
            setError(e.message)
        }

        dispatch(fetchOrder(inputRef.current.value.toUpperCase(), onSuccess, onError))
    }

    return (
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
            <div className={'heading'}>
                <h1>Track Order</h1>
            </div>
            <div>Please provide your order id</div>
            <input placeholder={'6 Characters Id'} maxLength={6} ref={inputRef} type="text"/>
            <div className={'btn1'} onClick={handleFetch}>Get Order Status</div>
        </div>
    );

}
export default Order;


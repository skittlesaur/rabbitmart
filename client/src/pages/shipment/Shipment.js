import styles from './shipment.module.css';
import {useState, useRef} from "react";
import {useDispatch} from "react-redux";
import Error from "../../components/feedback/error/Error";
import {useNavigate} from "react-router-dom";
import {fetchShipment} from "../../actions/shipping";

const Shipment = () => {

    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const inputRef = useRef();
    const navigate = useNavigate();

    const handleFetch = () => {

        if (inputRef.current.value.length !== 6)
            return setError('Enter a valid order id');

        const onSuccess = (shipment) => {
            navigate(`/shipping/${shipment.order_id}`)
        }

        const onError = (e) => {
            setError(e.message)
        }

        dispatch(fetchShipment(inputRef.current.value.toUpperCase(), onSuccess, onError))
    }

    return (
        <div className={styles['wrapper']}>
            {error && <Error error={error} setError={setError}/>}
            <div className={'heading'}>
                <h1>Track Shipping</h1>
            </div>
            <div>Please provide your shipment id</div>
            <input placeholder={'6 Characters Id'} maxLength={6} ref={inputRef} type="text"/>
            <div className={'btn1'} onClick={handleFetch}> Get Shipment Status</div>
        </div>
    );

}
export default Shipment;


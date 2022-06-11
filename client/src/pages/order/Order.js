import { fetchOrder } from "../../actions/order";
import {useState, useRef} from "react";
import {useDispatch} from "react-redux";
const Order = () => {

    const dispatch = useDispatch();
    const [order, setOrder] = useState([]);
    const inputRef = useRef();
    const [error, setError] = useState('');
    const handleFetch = () => {

        const onSuccess = (order) => {
            setOrder(order);
        }

        const onError = (e) => {
            setError(e.message);
        }
        if(!inputRef){
            window.alert('Please enter your order id');
        }

        dispatch(fetchOrder(inputRef.current.value, onSuccess, onError))
    }

    return (
        <>
            <div>Please provide your order id</div>
            <input ref={inputRef} type="text"/>
            <button onClick={handleFetch}> Get order Status</button>
            <div>
                {order.status}
            </div>
        </>
    );

}
export default Order;


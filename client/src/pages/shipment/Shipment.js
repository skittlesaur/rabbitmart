import {useState, useRef} from "react";
import {useDispatch} from "react-redux";
import {fetchShipment} from "../../actions/shipment";

const Shipment = () => {

    const dispatch = useDispatch();
    const [shipment, setShipment] = useState([]);
    const [error, setError] = useState('');
    const inputRef = useRef();

    const handleFetch = () => {

        const onSuccess = (shipment) => {
            setShipment(shipment);
        }

        const onError = (e) => {
            setError(e.message)
        }

        dispatch(fetchShipment(inputRef.current.value, onSuccess, onError))
    }

    return (
        <>
            <div>Please provide your shipment id</div>
            <input ref={inputRef} type="text"/>
            <button onClick={handleFetch}> Get Shipment Status</button>
            <div>
                {shipment.status}
            </div>
        </>
    );

}
export default Shipment;


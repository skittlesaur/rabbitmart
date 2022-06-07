import {useEffect, useState , useRef} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import Loading from "../../components/loading/Loading";
import { fetchShipment } from "../../actions/shipment";
import Error from "../../components/feedback/error/Error";

const Shipment = () => {

    const {id} = 3;
    const dispatch = useDispatch();
    const [shipment, setShipment] = useState([]);
    const [error, setError] = useState('');
    const idref =useRef();

    function handleAddTodo(e){
        var id_Input=idref.current.value;
        if(id_Input === '') 
        {return window.alert('you didnot provide an Id');}
        else{
        }
        
    }
    const handleFetch=() => {

        const onSuccess = (shipment) => {
            setShipment(shipment);
        }
        const onError = (e) => {
            setError(e.message)
        }
        dispatch(fetchShipment(id, onSuccess,onError))
    }

    return (
        <> 
            <div>Please provide your shipment id</div>
            <input ref={idref} type="text"/>
            <button onClick={handleFetch}> Get Shipment Status</button>
            {shipment}
            {/* <div></div> */}
             
        </>
    );

}
export default Shipment;


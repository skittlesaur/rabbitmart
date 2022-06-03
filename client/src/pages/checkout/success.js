import {useNavigate, useSearchParams} from "react-router-dom";
import Loading from "../../components/loading/Loading";
import {useEffect} from "react";

const Success = ({setCart}) => {

    const order_id = useSearchParams()[0].get('order');
    const navigate = useNavigate();

    useEffect(() => {
        setCart([]);
        localStorage.removeItem('cart');
        navigate(`/orders/${order_id}`);
    }, [])

    return <Loading text={'Processing'}/>
}

export default Success;
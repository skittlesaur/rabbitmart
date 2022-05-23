import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {verifyUser} from "../../actions/auth";
import Loading from "../loading/Loading";

const PrivateRoute = ({component, role}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    useEffect(() => {

        const onError = () => {
            navigate('/login');
        }

        const onSuccess = (user) => {
            if (!role || role === user.role)
                return setAuth(true);
            navigate('/401');
        }

        dispatch(verifyUser(onSuccess, onError));
    }, [])

    if (auth)
        return component;
    return <Loading text={'Verifying'}/>
}

export default PrivateRoute;
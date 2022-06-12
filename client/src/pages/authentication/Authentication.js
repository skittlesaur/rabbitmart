import styles from './authentication.module.css';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Authentication = ({data}) => {

    const navigate = useNavigate();
    const user = useSelector(state => state.authentication.user);

    useEffect(() => {
        if (user)
            return navigate('/');
    }, [user, navigate])

    return (
        <div className={styles['wrapper']}>
            <div className={styles['form']}>
                {data}
            </div>
        </div>
    );
}

export default Authentication;
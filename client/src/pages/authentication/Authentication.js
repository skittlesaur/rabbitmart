import styles from './authentication.module.css';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Authentication = ({data}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        const {user} = profile;

        if (user)
            navigate('/');
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['form']}>
                {data}
            </div>
        </div>
    );
}

export default Authentication;
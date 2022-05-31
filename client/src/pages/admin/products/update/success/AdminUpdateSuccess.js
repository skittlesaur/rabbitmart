import styles from './adminUpdateSuccess.module.css';
import {useSelector} from "react-redux";
import CartItem from "../../../../../components/cart-item/CartItem";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const AdminUpdateSuccess = () => {

    const navigate = useNavigate();
    const updatedData = useSelector(state => state.products?.updated);

    useEffect(() => {
        if (!updatedData)
            navigate('/admin/products/update');
    }, [navigate, updatedData])

    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>Items changed in the database</div>
            <div className={styles['updated-wrapper']}>
                {updatedData?.map((item, i) => <CartItem product={item} edit={false} id={true} key={i}/>)}
            </div>
        </div>
    );
}

export default AdminUpdateSuccess;
import styles from './admin.module.css';
import {Link} from "react-router-dom";

const Admin = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>Admin Panel</h1>
            </div>
            <div className={styles['actions']}>
                <Link to={'/admin/products/new'} className={styles['action']}>Add New Product</Link>
                <Link to={'/admin/products/update'} className={styles['action']}>Update Products</Link>
                <Link to={'/admin/orders'} className={styles['action']}>Track Orders</Link>
                <Link to={'/admin/orders/update'} className={styles['action']}>Update Order Status</Link>
                <Link to={'/admin/shipping'} className={styles['action']}>Track Shipping</Link>
                <Link to={'/admin/shipping/update'} className={styles['action']}>Update Shipping Status</Link>
            </div>
        </div>
    );
}

export default Admin;
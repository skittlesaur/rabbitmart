import styles from './footer.module.css';
import Logo from '../../shared/assets/logo.png';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['top-wrapper']}>
                <div className={styles['logo-wrapper']}>
                    <img src={Logo} alt={'Rabbit Mart'}/>
                </div>
                <div className={styles['pages-wrapper']}>
                    <div className={styles['pages']}>
                        <div className={styles['page-title']}>My Account</div>
                        <div className={styles['pages-list']}>
                            <Link to={'/orders'}>Order History</Link>
                            <Link to={'/cart'}>Shopping Cart</Link>
                            <Link to={'/settings'}>Settings</Link>
                        </div>
                    </div>
                    <div className={styles['pages']}>
                        <div className={styles['page-title']}>Products</div>
                        <div className={styles['pages-list']}>
                            <Link to={'/products/fruits & vegetables'}>Fruits & Vegetables</Link>
                            <Link to={'/products/grocery'}>Grocery Products</Link>
                            <Link to={'/products'}>All Products</Link>
                        </div>
                    </div>
                    <div className={styles['pages']}>
                        <div className={styles['page-title']}>Development</div>
                        <div className={styles['pages-list']}>
                            <a href={'https://github.com/skittlesaur/rabbitmart'} target={'_blank'} rel={'noreferrer'}>GitHub Repository</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['credits']}>
                Curious Monkeys, 2022.
            </div>
        </div>
    );
}

export default Footer;
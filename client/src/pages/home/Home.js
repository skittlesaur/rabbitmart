import styles from './home.module.css';
import {Link} from "react-router-dom";
import DeliveryImg from '../../shared/assets/delivery.png';

const Home = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['hero']}>
                <h1>Groceries and more in <span>20</span> minutes</h1>
                <p>Making on-demand retail a reality!</p>
                <Link className={'btn1'} to={'products'}>Shop Now</Link>
                <div className={styles['delivery']}>
                    <img src={DeliveryImg} alt={'Delivery'} loading={'lazy'}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
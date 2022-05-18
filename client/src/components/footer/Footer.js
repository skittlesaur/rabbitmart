import styles from './footer.module.css';
import Logo from '../../shared/assets/logo.png';

const Footer = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['logo-wrapper']}>
                <img src={Logo} alt={'Rabbit Mart'}/>
            </div>
            <div className={styles['credits']}>
                Curious Monkeys, 2022.
            </div>
        </div>
    );
}

export default Footer;
import styles from './main.module.css';

const Main = ({code, message}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['code']}>{code}</div>
            <div className={styles['message']}>{message}</div>
        </div>
    );
}

export default Main;
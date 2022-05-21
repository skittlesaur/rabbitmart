import styles from './authentication.module.css';

const Authentication = ({data}) => {

    return (
        <div className={styles['wrapper']}>
            <div className={styles['form']}>
                {data}
            </div>
        </div>
    );
}

export default Authentication;
import styles from './loading.module.css';

const Loading = ({text = "Loading", overlay = false}) => {
    return (
        <div style={{position: overlay ? "fixed" : "relative"}} className={styles['wrapper']}>
            <div className={styles['loading']}/>
            <div>{text}</div>
        </div>
    );
}

export default Loading;
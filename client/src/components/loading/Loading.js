import styles from './loading.module.css';

const Loading = ({text = "Loading"}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['loading']}/>
            <div>{text}</div>
        </div>
    );
}

export default Loading;
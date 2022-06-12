import styles from './pages.module.css';

const Pages = ({max, current = 1, onPageClick}) => {
    return (
        <div className={styles['wrapper']}>
            {Array.from({length: max}, (_, i) => i + 1).map((i) =>
                <div key={i} className={`${styles['page']} ${current===i && styles['active']}`} onClick={() => onPageClick(i)}>{i}</div>
            )}
        </div>
    );
}

export default Pages;
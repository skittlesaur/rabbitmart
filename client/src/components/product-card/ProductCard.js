import styles from './productCard.module.css';

const ProductCard = ({product}) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['image-wrapper']}>
                <img src={product.image} alt={product.name}/>
            </div>
            <div className={styles['content']}>
                <p className={styles['name']}>{product.name}</p>
                <div className={styles['footer']}>
                    <div className={styles['details']}>
                        <p className={styles['weight']}>{product.weight}{product.measurement}</p>
                        <p className={styles['price']}>{Number(product.price).toFixed(2)} EGP</p>
                    </div>
                    <div className={styles['add-to-cart']}>Add to Cart</div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
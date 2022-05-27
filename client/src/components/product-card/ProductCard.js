import styles from './productCard.module.css';
import {useRef, useState} from "react";
import {motion} from 'framer-motion';

const ProductCard = ({product, addProductToCart}) => {

    const [addToCart, setAddToCart] = useState(false);
    const wrapperRef = useRef();

    const handleAddToCart = () => {
        setAddToCart(true);

        setTimeout(() => {
            setAddToCart(false);
            addProductToCart(product);
        }, 600)
    }

    const getXi = () => {
        const elementData = wrapperRef.current.getBoundingClientRect();
        return elementData.x;
    }

    const getXf = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1024)
            return windowWidth - 11 * 16;
        return windowWidth - 5 * 16
    }

    const getYi = () => {
        const elementData = wrapperRef.current.getBoundingClientRect();
        return elementData.y;
    }

    return (
        <div ref={wrapperRef} className={`${styles['wrapper']} ${!product.stock && styles['out-of-stock']}`}>
            {addToCart &&
                <motion.img initial={{
                    x: getXi(),
                    y: getYi(),
                    padding: '1em',
                    borderRadius: '10px'
                }}
                            animate={{
                                x: getXf(),
                                y: 0,
                                width: 24,
                                height: 24,
                                opacity: .8,
                                borderRadius: '50%',
                                padding: '.5em'
                            }}
                            transition={{type: "spring", stiffness: 40, bounce: 0}}
                            className={styles['cart-img']}
                            src={product.image}
                            alt={product.name}/>}
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
                    {product.stock ?
                        <div onClick={handleAddToCart} className={styles['add-to-cart']}>Add to Cart</div> :
                        <div className={styles['unavailable']}>Out of Stock</div>}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
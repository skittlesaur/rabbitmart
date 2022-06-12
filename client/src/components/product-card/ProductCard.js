import styles from './productCard.module.css';
import {useRef, useState} from "react";
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {updateWishlist} from "../../actions/auth";
import {useNavigate} from "react-router-dom";

const ProductCard = ({product, addProductToCart, productsPage = false}) => {

    const [addToCart, setAddToCart] = useState(false);
    const wrapperRef = useRef();
    const wishlist = useSelector(state => state.authentication.user?.wishlist) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleWishlist = () => {
        const onError = () => {
            navigate('/login');
        }

        dispatch(updateWishlist(product.product_id, onError));
    }

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
        <div ref={wrapperRef}
             className={`${styles['wrapper']} ${productsPage ? styles['products-page'] : ''} ${!product.stock && styles['out-of-stock']}`}>
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
                <span onClick={handleWishlist}
                      className={`material-symbols-outlined ${styles['wishlist']} ${wishlist.includes(product.product_id) && styles['wishlisted']}`}>favorite</span>
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
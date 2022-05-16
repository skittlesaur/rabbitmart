import styles from './home.module.css';
import {Link} from "react-router-dom";
import DeliveryImg from '../../shared/assets/delivery.png';
import Categories from "../../components/categories/Categories";
import ProductCard from "../../components/product-card/ProductCard";

const Home = () => {
    const getTestProduct = () => {
        return {
            id: 1,
            name: "Coca-Cola Can",
            price: Math.random() * 1000,
            image: "https://cdnprod.mafretailproxy.com/sys-master-root/hf4/h05/27691794989086/443516_main.jpg_480Wx480H",
            weight: Math.floor(Math.random() * 900 + 100),
            measurement: "ml",
            category: "Cold Drinks"
        }
    }

    const products = Array(20).fill(null).map(() => getTestProduct());

    return (
        <div className={styles['wrapper']}>
            <div className={styles['hero']}>
                <h1>Groceries and more in <span>20</span> minutes</h1>
                <p>Making on-demand retail a reality!</p>
                <Link className={'btn1'} to={'products'}>Shop Now</Link>
                <div className={styles['delivery']}>
                    <img src={DeliveryImg} alt={'Delivery'}/>
                </div>
            </div>
            <Categories/>
            <div className={styles['recommended-wrapper']}>
                <div className={'heading-wrapper'}>
                    <h1 className={'heading'}>Recommended Products</h1>
                </div>
                <div className={styles['products-wrapper']}>
                    {products.map((product, i) => <ProductCard product={product} key={i}/>)}
                </div>
            </div>
        </div>
    );
}

export default Home;
import styles from './home.module.css';
import {Link} from "react-router-dom";
import DeliveryImg from '../../shared/assets/delivery.png';
import Categories from "../../components/categories/Categories";
import ProductCard from "../../components/product-card/ProductCard";
import DeliveryIcon from '../../shared/assets/why/delivery.png';
import ReliableIcon from '../../shared/assets/why/reliable.png';
import PricesIcon from '../../shared/assets/why/prices.png';

const Home = () => {
    const categories = ['Cold Drinks', 'Hot Drinks', 'Groceries', 'Fruits & Vegetables', 'Breakfast'];

    const products = [
        {
            "_id": {
                "$oid": "6283c53abe9fa244b53d24f7"
            },
            "name": "Straberry Pack",
            "price": 17,
            "image": "https://fresh.hmart.com/media/catalog/product/cache/0c75b0d6b380af6dca3ec180c127a709/7/1/71575620002_1.png",
            "weight": 250,
            "measurement": "gm",
            "category": "Fruits & Vegetables"
        },
        {
            "_id": {
                "$oid": "6283c53abe9fa244b53d24f8"
            },
            "name": "Imported Black Grapes",
            "price": 44,
            "image": "https://thefruteria.online/wp-content/uploads/2022/02/1642324866392.png",
            "weight": 500,
            "measurement": "gm",
            "category": "Fruits & Vegetables"
        },
        {
            "_id": {
                "$oid": "6283c53abe9fa244b53d24f9"
            },
            "name": "Imported Sweet Pineapples",
            "price": 90,
            "image": "https://alchetron.com/cdn/pineapple-52c07283-1bf0-4b37-8f14-2c0f74bb44c-resize-750.png",
            "weight": 1,
            "measurement": "pc",
            "category": "Fruits & Vegetables"
        },
        {
            "_id": {
                "$oid": "6283c53abe9fa244b53d24fa"
            },
            "name": "Imported Mixed Apples",
            "price": 74,
            "image": "https://www.sunmoonfood.com/wp-content/uploads/Fuji-Apples-02.png",
            "weight": 6,
            "measurement": "pcs",
            "category": "Fruits & Vegetables"
        },
        {
            "_id": {
                "$oid": "6283c53abe9fa244b53d24fb"
            },
            "name": "Imported Yellow Apples",
            "price": 70,
            "image": "https://www.marlene.it/media/c7006c54-9054-4670-97ec-5b54b38ab8d2/602_x_602/p=5/golden-rgb-en.png",
            "weight": 6,
            "measurement": "pcs",
            "category": "Fruits & Vegetables"
        }
    ]

    return (
        <div className={styles['wrapper']}>
            <div className={styles['hero']}>
                <div className={styles['hero-text']}>
                    <h1>Groceries and more in <span>20</span> minutes</h1>
                    <p>Making on-demand retail a reality!</p>
                    <Link className={'btn1'} to={'products'}>Shop Now</Link>
                </div>
                <div className={styles['delivery']}>
                    <img src={DeliveryImg} alt={'Delivery'}/>
                </div>
            </div>
            <section>
                <div className={'heading-wrapper'}>
                    <h1 className={'heading'}>Categories</h1>
                </div>
                <Categories/>
            </section>
            <section>
                <div className={'heading-wrapper'}>
                    <h1 className={'heading'}>Recommended Products</h1>
                </div>
                <div className={styles['categories-wrapper']}>
                    {categories.map((category, j) =>
                        <div key={j} className={styles['category-wrapper']}>
                            <div className={'heading2'}>
                                <Link to={`/products/${category}`}>{category}</Link>
                            </div>
                            <div className={styles['products-wrapper']}>
                                {products.map((product, i) => <ProductCard product={product} key={i}/>)}
                            </div>
                        </div>
                    )}
                    <Link to={'/products'} className={`btn1 ${styles['see-all']}`}>See All</Link>
                </div>
            </section>
            <div className={styles['why']}>
                <div className={styles['why-component']}>
                    <img src={DeliveryIcon} alt={'Delivery'}/>
                    <div className={'why-text'}>
                        <div className={styles['why-title']}>Under 20 minutes</div>
                        <div className={styles['why-desc']}>Delivered on time - Every time!</div>
                    </div>
                </div>
                <div className={styles['why-component']}>
                    <img src={ReliableIcon} alt={'Reliable'}/>
                    <div className={'why-text'}>
                        <div className={styles['why-title']}>Reliable</div>
                        <div className={styles['why-desc']}>Get what you order - Every time!</div>
                    </div>
                </div>
                <div className={styles['why-component']}>
                    <img src={PricesIcon} alt={'Prices'}/>
                    <div className={'why-text'}>
                        <div className={styles['why-title']}>Amazing prices</div>
                        <div className={styles['why-desc']}>Offers offers offers - Every time!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
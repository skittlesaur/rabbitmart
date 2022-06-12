import styles from './products.module.css';
import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getProductsPerPage, productsSearch} from "../../actions/products";
import ProductCard from "../../components/product-card/ProductCard";
import Pages from "../../components/pages/Pages";
import Categories from "../../components/categories/Categories";
import Loading from "../../components/loading/Loading";

const Products = ({addProductToCart}) => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        const query = new URLSearchParams(location.search);
        const page = query.get('page') || 1;
        setPage(Number(page));

        if (query.get('search')) {
            const search = query.get('search');

            dispatch(productsSearch(search, page, onSuccess));
        } else if (query.get('category')) {
            const category = query.get('category');
            if (category === 'All') {
                setPage(Number(page));

                dispatch(getProductsPerPage(page, null, onSuccess));
            } else {
                dispatch(getProductsPerPage(page, category, onSuccess));
            }
        } else {
            setPage(Number(page));

            dispatch(getProductsPerPage(page, null, onSuccess));
        }
    }, [dispatch, location.search]);

    const onSuccess = (res) => {
        setTotalPages(res.total_pages);
        setProducts(res.products);
        setLoading(false);
    }

    const handleClick = (i) => {
        const query = new URLSearchParams(location.search);

        if (query.get('search')) {
            const search = query.get('search');
            navigate(`/products?search=${search}&page=${i}`);
            window.scrollTo(0, 0);
        } else if (query.get('category')) {
            const category = query.get('category');
            navigate(`/products?category=${category}&page=${i}`);
            window.scrollTo(0, 0);
        } else {
            navigate(`/products?page=${i}`);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>Products</h1>
            </div>
            <Categories/>
            {loading ? <Loading/> :
                <>
                    <div className={styles['products-wrapper']}>
                        {products.map(((product, i) => <ProductCard addProductToCart={addProductToCart} key={i}
                                                                    product={product} productsPage={true}/>))}
                    </div>
                    <Pages max={totalPages} current={page} onPageClick={handleClick}/>
                </>
            }
        </div>
    )
        ;
}

export default Products;
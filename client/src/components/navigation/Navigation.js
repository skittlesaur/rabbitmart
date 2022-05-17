import styles from './navigation.module.css';
import Logo from '../../shared/assets/logo.png';
import {Link} from "react-router-dom";
import {useState} from "react";
import {SEARCH_HIDDEN, SEARCH_VISIBLE} from "./constants/search";
import {useNavigate} from "react-router-dom";


const Navigation = () => {

    const [search, setSearch] = useState(SEARCH_HIDDEN);
    const [menuActive, setMenuActive] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const width = window.innerWidth;

        if (width < 980 && search === SEARCH_HIDDEN) {
            setSearch(SEARCH_VISIBLE);
        } else {
            navigate(`/products?search=${searchInput.replaceAll(' ', '%20')}`);
        }

    }

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setSearch(SEARCH_HIDDEN);
    }

    return (
        <div className={styles['wrapper']}>
            {search === SEARCH_VISIBLE && <div onClick={(e) => handleClose(e)} className={styles['hide-search']}/>}
            <Link to={'/'} className={styles['logo']}>
                <img src={Logo} alt={'Rabbit'}/>
            </Link>
            <div className={`${styles['nav-wrapper']} ${menuActive && styles['show-menu']}`}>
                <div onClick={() => setMenuActive(false)} className={`${styles['close-menu']}`}><span
                    className={'material-symbols-outlined'}>close</span> Close
                </div>
                <nav className={styles['nav']}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/products'}>Products</Link>
                    <Link to={'/orders'}>Previous Orders</Link>
                    <Link to={'/shipping'}>Track Shipping</Link>
                </nav>
            </div>
            <div className={styles['actions']}>
                <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput}
                       placeholder={'Search'}
                       className={`${styles['search']} ${search === SEARCH_VISIBLE && styles['search-active']}`}/>
                <div onClick={handleSearch} className={`material-symbols-outlined ${styles['icon']}`}>search</div>
                <Link to={'/cart'}
                      className={`material-symbols-outlined ${styles['icon']} ${search === SEARCH_VISIBLE && styles['hide-icon']}`}>shopping_cart</Link>
                <div
                    onClick={() => setMenuActive(true)}
                    className={`material-symbols-outlined ${styles['icon']} ${styles['menu']} ${search === SEARCH_VISIBLE && styles['hide-icon']}`}>menu
                </div>
            </div>
        </div>
    )
        ;
}

export default Navigation;
import styles from './navigation.module.css';
import Logo from '../../shared/assets/logo.png';
import {Link} from "react-router-dom";
import {useState} from "react";
import {SEARCH_HIDDEN, SEARCH_VISIBLE} from "./constants/search";
import {useNavigate} from "react-router-dom";


const Navigation = ({cartCount}) => {

    const [search, setSearch] = useState(SEARCH_HIDDEN);
    const [menuActive, setMenuActive] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'))?.user;
    const auth = !!user;
    const admin = auth && user.role === 'ADMIN';
    const [dropdown, setDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('profile');
        navigate('/');
    }

    const handleDropDown = () => {
        setDropdown(!dropdown);
    }

    const handleSearch = () => {
        const width = window.innerWidth;

        if (width < 980 && search === SEARCH_HIDDEN) {
            setSearch(SEARCH_VISIBLE);
        } else {
            navigate(`/products?search=${searchInput}`);
            setSearch(SEARCH_HIDDEN);
            setSearchInput('');
        }

    }

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setSearch(SEARCH_HIDDEN);
    }

    const closeMenu = () => {
        setMenuActive(false);
    }

    return (
        <div className={styles['wrapper']}>
            {search === SEARCH_VISIBLE && <div onClick={(e) => handleClose(e)} className={styles['hide-search']}/>}
            <Link to={'/'} className={styles['logo']}>
                <img src={Logo} alt={'Rabbit'}/>
            </Link>
            <div className={`${styles['nav-wrapper']} ${menuActive && styles['show-menu']}`}>
                <div onClick={closeMenu} className={`${styles['close-menu']}`}><span
                    className={'material-symbols-outlined'}>close</span> Close
                </div>
                <nav className={styles['nav']}>
                    <Link onClick={closeMenu} to={'/'}>Home</Link>
                    {!auth &&
                        <Link className={styles['account']} onClick={closeMenu} to={'/login'}>Login/Sign Up</Link>}
                    <Link onClick={closeMenu} to={'/products'}>Products</Link>
                    {auth && <Link onClick={closeMenu} className={styles['account']} to={'/wishlist'}>Wishlist</Link>}
                    {auth &&
                        <Link onClick={closeMenu} className={styles['account']} to={'/orders'}>Previous Orders</Link>}
                    <Link onClick={closeMenu} to={'/shipping'}>Track Shipping</Link>
                    {admin && <Link onClick={closeMenu} className={styles['account']} to={'/admin'}>Admin Panel</Link>}
                    {auth && <a className={styles['account']} onClick={() => {
                        handleLogout();
                        closeMenu();
                    }}>Logout</a>}
                </nav>
            </div>
            <div className={styles['actions']}>
                <input onChange={(e) => setSearchInput(e.target.value)}
                       onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                       value={searchInput}
                       placeholder={'Search'}
                       className={`${styles['search']} ${search === SEARCH_VISIBLE && styles['search-active']}`}/>
                <div onClick={handleSearch} className={`material-symbols-outlined ${styles['icon']}`}>search</div>
                <Link to={'/cart'}
                      className={`material-symbols-outlined ${styles['icon']} ${search === SEARCH_VISIBLE && styles['hide-icon']}`}>shopping_cart
                    {cartCount ?
                        <div className={styles['cart-counter']}>{cartCount < 100 ? cartCount : "+"}</div> : ''}</Link>
                <Link onClick={auth && handleDropDown} to={!auth && 'login'}
                      className={`material-symbols-outlined ${styles['account-icon']} ${styles['icon']}`}>person</Link>
                {auth && dropdown && <div className={styles['account-dropdown']}>
                    <Link to={'/wishlist'}>Wishlist</Link>
                    <Link to={'/orders'}>Orders</Link>
                    {admin && <Link to={'/admin'}>Admin Panel</Link>}
                    <div onClick={handleLogout}>Logout</div>
                </div>}
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
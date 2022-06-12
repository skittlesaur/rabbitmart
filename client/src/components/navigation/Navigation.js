import styles from './navigation.module.css';
import Logo from '../../shared/assets/logo.png';
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {SEARCH_HIDDEN, SEARCH_VISIBLE} from "./constants/search";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/auth";


const Navigation = ({cartCount}) => {

    const [search, setSearch] = useState(SEARCH_HIDDEN);
    const [menuActive, setMenuActive] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchElement = useRef();
    const navigate = useNavigate();
    const user = useSelector(state => state.authentication.user);
    const auth = !!user;
    const admin = auth && user.role === 'ADMIN';
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setDropdown(false);
    }, [navigate])

    const handleLogout = () => {
        dispatch(logout);
        navigate('/login');
    }

    const handleDropDown = () => {
        setDropdown(!dropdown);
    }

    const handleSearch = () => {
        const width = window.innerWidth;

        if (width < 980 && search === SEARCH_HIDDEN) {
            setSearch(SEARCH_VISIBLE);
            searchElement.current.focus();
        } else {
            searchElement.current.blur();
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

    const handleHideMenu = (e) => {
        e.target.style = 'display:none';
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target)
            target.click();
        e.target.style = '';
        setDropdown(false);
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
                    {auth && <Link onClick={closeMenu} className={styles['account']} to={'/wishlist'}>Wishlist {user.wishlist?.length > 0 ? `(${user.wishlist?.length})` : ''}</Link>}
                    {auth &&
                        <Link onClick={closeMenu} className={styles['account']} to={'/orders'}>Previous Orders</Link>}
                    <Link onClick={closeMenu} to={'/shipping'}>Track Shipping</Link>
                    {admin && <Link onClick={closeMenu} className={styles['account']} to={'/admin'}>Admin Panel</Link>}
                    {auth && <div className={styles['account']} onClick={() => {
                        handleLogout();
                        closeMenu();
                    }}>Logout</div>}
                </nav>
            </div>
            <div className={styles['actions']}>
                <input onChange={(e) => setSearchInput(e.target.value)}
                       onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                       value={searchInput}
                       placeholder={'Search'}
                       ref={searchElement}
                       className={`${styles['search']} ${search === SEARCH_VISIBLE && styles['search-active']}`}/>
                <div onClick={handleSearch} className={`material-symbols-outlined ${styles['icon']}`}>search</div>
                <Link to={'/cart'}
                      className={`material-symbols-outlined ${styles['icon']} ${search === SEARCH_VISIBLE && styles['hide-icon']}`}>shopping_cart
                    {cartCount ?
                        <div className={styles['cart-counter']}>{cartCount < 100 ? cartCount : "+"}</div> : ''}</Link>
                <Link onClick={auth && handleDropDown} to={!auth && 'login'}
                      className={`material-symbols-outlined ${styles['account-icon']} ${styles['icon']}`}>person</Link>
                {auth && dropdown && <div className={styles['account-dropdown']}>
                    <div onClick={(e) => handleHideMenu(e)}
                         className={styles['hide-dropdown']}/>
                    <Link
                        to={'/wishlist'}>Wishlist {user.wishlist?.length > 0 ? `(${user.wishlist?.length})` : ''}</Link>
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
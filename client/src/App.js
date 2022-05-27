import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import './shared/css/master.css';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import CartPage from "./pages/cart/Cart";
import {useEffect, useState} from "react";
import Signup from "./pages/authentication/signup/Signup";
import Login from "./pages/authentication/login/Login";
import PrivateRoute from "./components/privete-route/PrivateRoute";
import Wishlist from "./pages/wishlist/Wishlist";
import Error401 from "./pages/errors/401/Error401";
import Error404 from "./pages/errors/404/Error404";
import Admin from "./pages/admin/default/Admin";
import AdminUpdate from "./pages/admin/products/update/default/AdminUpdate";
import AdminUpdateSuccess from "./pages/admin/products/update/success/AdminUpdateSuccess";
import AdminUpdateOrder from "./pages/admin/orders/update/AdminUpdateOrder";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import AdminOrders from "./pages/admin/orders/default/AdminOrders";
import AdminViewOrder from "./pages/admin/orders/id/AdminViewOrder";

const cartInitialization = JSON.parse(localStorage.getItem('cart')) || [];

const App = () => {

    const [cart, setCart] = useState(cartInitialization);

    const addProductToCart = (product) => {
        const productIndex = cart.findIndex((cartProduct) => cartProduct._id.$oid === product._id.$oid);

        if (productIndex >= 0) {
            const updatedData = {...cart[productIndex], quantity: cart[productIndex].quantity + 1};
            const newArray = [...cart];
            newArray[productIndex] = updatedData;
            setCart(newArray);
        } else {
            setCart([...cart, {...product, quantity: 1}]);
        }
    }

    const removeProductFromCart = (product) => {
        const productIndex = cart.findIndex((cartProduct) => cartProduct._id.$oid === product._id.$oid);

        if (productIndex === -1)
            return;

        if (cart[productIndex].quantity === 1) {
            const newArr = cart.filter((cartItem) => cartItem._id.$oid !== product._id.$oid);
            setCart(newArr);
        } else {
            const updatedData = {...cart[productIndex], quantity: cart[productIndex].quantity - 1};
            const newArray = [...cart];
            newArray[productIndex] = updatedData;
            setCart(newArray);
        }
    }

    const updateQuantity = (product, operation) => {
        if (operation === 'ADD')
            return addProductToCart(product);

        if (operation === 'REMOVE')
            return removeProductFromCart(product)
    }

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        let products = 0;
        for (const cartElement of cart) {
            products += cartElement.quantity;
        }

        setCartCount(products);
    }, [cart])

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <Navigation cartCount={cartCount}/>
            <Routes>
                <Route path={'/'} element={<Home addProductToCart={addProductToCart}/>}/>
                <Route path={'/cart'}
                       element={<CartPage cart={cart} cartCount={cartCount} updateQuantity={updateQuantity}/>}/>
                <Route path={'/signup'} element={<Signup/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/wishlist'} element={<PrivateRoute component={<Wishlist/>}/>}/>
                <Route path={'/admin'} element={<PrivateRoute role={'ADMIN'} component={<Admin/>}/>}/>
                <Route path={'/admin/orders'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminOrders/>}/>}/>
                <Route path={'/admin/orders/update'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminUpdateOrder/>}/>}/>
                <Route path={'/admin/products/update'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminUpdate/>}/>}/>
                <Route path={'/admin/products/update/success'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminUpdateSuccess/>}/>}/>
                <Route path={'/admin/orders/:id'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminViewOrder/>}/>}/>
                <Route path={'/401'} element={<Error401/>}/>
                <Route path={'/*'} element={<Error404/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
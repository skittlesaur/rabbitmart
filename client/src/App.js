import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import './shared/css/master.css';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import CartPage from "./pages/cart/Cart";
import {useEffect, useState} from "react";
import Order from "./pages/order/Order";
import Signup from "./pages/authentication/signup/Signup";
import Shipment from "./pages/shipment/Shipment";
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
import AdminNewProduct from "./pages/admin/products/new/AdminNewProduct";
import AdminShipping from "./pages/admin/shipment/default/AdminShipping";
import AdminUpdateShipping from "./pages/admin/shipment/update/AdminUpdateShipping";
import Products from './pages/products/Products';

import Checkout from "./pages/checkout/checkout";
import Success from "./pages/checkout/success";
import ShipmentId from "./pages/shipment/id/ShipmentId";
import OrderId from "./pages/order/id/OrderId";

const cartInitialization = JSON.parse(localStorage.getItem('cart')) || [];

const App = () => {

    const [cart, setCart] = useState(cartInitialization);

    const addProductToCart = (product) => {
        const productIndex = cart.findIndex((cartProduct) => cartProduct.product_id === product.product_id);

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
        const productIndex = cart.findIndex((cartProduct) => cartProduct.product_id === product.product_id);

        if (productIndex === -1)
            return;

        if (cart[productIndex].quantity === 1) {
            const newArr = cart.filter((cartItem) => cartItem.product_id !== product.product_id);
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
                <Route path={'/products'} element={<Products addProductToCart={addProductToCart}/>}/>
                <Route path={'/cart'}
                       element={<CartPage cart={cart} cartCount={cartCount} updateQuantity={updateQuantity}/>}/>
                <Route path={'/checkout'} element={<Checkout/>}/>
                <Route path={'/checkout/success'} element={<Success setCart={setCart}/>}/>
                <Route path={'/signup'} element={<Signup/>}/>
                <Route path={'/shipping'} element={<Shipment/>}/>
                <Route path={'/shipping/:id'} element={<ShipmentId/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/orders'} element={<Order/>}/>
                <Route path={'/orders/:id'} element={<OrderId/>}/>
                <Route path={'/wishlist'} element={<PrivateRoute component={<Wishlist addProductToCart={addProductToCart}/>}/>}/>
                <Route path={'/admin'} element={<PrivateRoute role={'ADMIN'} component={<Admin/>}/>}/>
                <Route path={'/admin/orders'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminOrders/>}/>}/>
                <Route path={'/admin/orders/update'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminUpdateOrder/>}/>}/>
                <Route path={'/admin/shipping'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminShipping/>}/>}/>
                <Route path={'/admin/shipping/update'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminUpdateShipping/>}/>}/>
                <Route path={'/admin/products/new'}
                       element={<PrivateRoute role={'ADMIN'} component={<AdminNewProduct/>}/>}/>
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
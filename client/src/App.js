import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import './shared/css/master.css';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import CartPage from "./pages/cart/Cart";
import {useEffect, useState} from "react";
import Signup from "./pages/authentication/signup/Signup";
import Login from "./pages/authentication/login/Login";

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
            <Navigation cartCount={cartCount}/>
            <Routes>
                <Route path={'/'} element={<Home addProductToCart={addProductToCart}/>}/>
                <Route path={'/cart'}
                       element={<CartPage cart={cart} cartCount={cartCount} updateQuantity={updateQuantity}/>}/>
                <Route path={'/signup'} element={<Signup/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
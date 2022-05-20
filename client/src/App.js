import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import './shared/css/master.css';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import Cart from "./pages/cart/Cart";
import {useState} from "react";

const App = () => {

    const [cart, setCart] = useState([]);

    const addProductToCart = (product) => {
        const productIndex = cart.findIndex((cartProduct) => cartProduct._id === product._id);

        if (productIndex >= 0) {
            const updatedData = {...cart[productIndex], quantity: cart[productIndex].quantity + 1};
            const newArray = [...cart];
            newArray[productIndex] = updatedData;
            setCart(newArray);
        } else {
            setCart([...cart, {...product, quantity: 1}]);
        }
    }

    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path={'/'} element={<Home addProductToCart={addProductToCart}/>}/>
                <Route path={'/cart'} element={<Cart cart={cart}/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
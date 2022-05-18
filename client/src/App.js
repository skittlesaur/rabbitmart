import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import './shared/css/master.css';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";

const App = () => {
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from '@reduxjs/toolkit'
import products from './reducers/products.js';
import authentication from "./reducers/authentication";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
    reducer: {products, authentication}
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from '@reduxjs/toolkit'
import products from './reducers/products.js';
import authentication from "./reducers/authentication";
import orders from "./reducers/orders";
import shipping from "./reducers/shipping";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
    reducer: {
        products,
        authentication,
        orders,
        shipping
    }
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
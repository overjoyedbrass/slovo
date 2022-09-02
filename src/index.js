import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './app/store.js'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const container = document.getElementById("root")
const root = createRoot(container)

root.render(      
    <Provider store={store}>
        <App />
    </Provider>
);

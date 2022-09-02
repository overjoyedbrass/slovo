import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <App />
);

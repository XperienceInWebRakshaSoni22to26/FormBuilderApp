import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import ContextProvider from "./Context/ContextProvider";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import "./index.css"

createRoot(document.getElementById('root')).render( <
    StrictMode >
    <
    BrowserRouter >
    <
    ContextProvider >
    <
    App / >
    <
    /ContextProvider> < /
    BrowserRouter > <
    /StrictMode>
);
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {AppThemeProvider} from "./util/theme/ThemeContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AppThemeProvider>
            <App />
            </AppThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)

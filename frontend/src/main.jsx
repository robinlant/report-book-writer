import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,

} from "react-router-dom";

import './reset.css'
import './index.css'
import RootPage from "./Pages/RootPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import LegalPage from "./Pages/LegalPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/legal" element={<LegalPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)

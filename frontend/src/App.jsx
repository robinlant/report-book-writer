import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootPage from "./Pages/RootPage/RootPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import LegalPage from "./Pages/LegalPage.jsx";
import SettingsPage from "./Pages/SettingsPage/SettingsPage.jsx";
import {useToast} from "./Components/ToastProvider/ToastContext.jsx";

function get_settings() {
    const saved_settings = localStorage.getItem("settings");

    return saved_settings
        ? JSON.parse(saved_settings)
        : {
            randomness: 65,
            max_line_len: 80,
            api_key: ""
        };
}

function App() {
    const [settings, setSettings] = useState(get_settings());
    const showToast = useToast();

    const update_settings = (new_settings) => {
        setSettings(new_settings)
        localStorage.setItem("settings", JSON.stringify(new_settings));
    };

    return (
        <Routes>
            <Route path="/" settings={settings} element={<RootPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/settings" element={<SettingsPage settings={settings} setSettings={update_settings} showToast={showToast}/>} />
        </Routes>
    );
}

export default App;

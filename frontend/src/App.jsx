import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootPage from "./Pages/RootPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import LegalPage from "./Pages/LegalPage.jsx";
import SettingsPage from "./Pages/SettingsPage/SettingsPage.jsx";

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

    const update_settings = (new_settings) => {
        setSettings(new_settings)
        localStorage.setItem("settings", JSON.stringify(new_settings));
    };

    return (
        <Routes>
            <Route path="/" element={<RootPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/settings" element={<SettingsPage settings={settings} setSettings={update_settings} />} />
        </Routes>
    );
}

export default App;

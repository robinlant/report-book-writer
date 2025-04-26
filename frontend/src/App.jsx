import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootPage from "./Pages/RootPage/RootPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import LegalPage from "./Pages/LegalPage.jsx";
import SettingsPage from "./Pages/SettingsPage/SettingsPage.jsx";
import { useToast } from "./Components/ToastProvider/ToastContext.jsx";
import LoadingOverlay from "./Components/LoadingOverlay/LoadingOverlay.jsx";

function get_settings() {
    const saved_settings = localStorage.getItem("settings");
    return saved_settings
        ? JSON.parse(saved_settings)
        : { randomness: 65, max_line_len: 80, api_key: "", specialization: "" };
}

function initialize_envs() {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    if (!apiUrl) {
        throw new Error("REACT_APP_API_URL is not defined in the environment variables.");
    }
    return apiUrl;
}

function App() {
    const [settings, setSettings] = useState(get_settings());
    const [loading, setLoading] = useState(false); // <--- ADD THIS
    const [abortController, setAbortController] = useState(null); // <--- ADD THIS
    const showToast = useToast();

    useEffect(() => {
        try {
            initialize_envs();
        } catch (error) {
            console.error(error);
            showToast("Error: API URL is not defined", "error");
        }
    }, []);

    const update_settings = (new_settings) => {
        setSettings(new_settings)
        localStorage.setItem("settings", JSON.stringify(new_settings));
    };

    async function makeApiCall(weekDays) {
        const url = initialize_envs() + "/api/write";
        const controller = new AbortController();

        const payload = {
            api_token: settings["api_key"],
            randomness: settings["randomness"],
            max_line_len: settings["max_line_len"],
            report: {
                week_days: weekDays,
                specialization: settings["specialization"],
                is_school_week: false
            }
        }


        setAbortController(controller);
        setLoading(true);

        // TODO Remove after development
        console.log(JSON.stringify(payload, null, 2))

        try {
            const response = await fetch(url, {
                method: "POST",
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if(response.status === 422){
                showToast("Falsches Anfrageformat. Bitte benachrichtigen Sie den Site-Administrator auf Deutsch");
                console.log(data);
                throw new Error(`422 Status code: False request format`);
            }

            if (!response.ok) {
                showToast("Unerwartete Fehler. Bitte versuchen Sie es später");
                console.log(data);
                throw new Error(`Non 200 status code: ${response.status}`);
            }

            if (data["is_error"]){
                showToast(data["error"]);
                console.log(data);
                throw new Error(`Application error: ${data["error"]}`)
            }

            console.log("API Call Success:", data);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Fetch error:", error);
            }
        } finally {
            setLoading(false);
            setAbortController(null);
        }
    }

    function cancelApiCall() {
        if (abortController) {
            abortController.abort();
        }
        setLoading(false);
    }

    return (
        <>
            {loading && <LoadingOverlay onCancel={cancelApiCall} />}
            <Routes>
                <Route path="/" element={<RootPage makeApiCall={makeApiCall} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/settings" element={<SettingsPage settings={settings} setSettings={update_settings} showToast={showToast} />} />
            </Routes>
        </>
    );
}

export default App;

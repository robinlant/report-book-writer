import PropTypes from "prop-types";
import BasePage from "../BasePage/BasePage.jsx";
import './SettingsPage.css'
import Button from "../../Components/Button/Button.jsx";
import {useState} from "react";

function SettingsPage({ settings, setSettings }) {
    if (!settings) {
        settings = {
            randomness: 65,
            max_line_len: 80,
            api_key: ""
        }
    }

    const new_settings = { ...settings };
    const [showKey, setShowKey] = useState(false);
    const [randomness, setRandomness] = useState(settings.randomness);
    const [maxLen, setMaxLen] = useState(settings.max_line_len);

    return (
        <BasePage>
            <div className="settings-block">
                <h2 className="text">Einstellungen</h2>
                <div>
                    <div className="label-row">
                      <label htmlFor="setting_api_key">Api Schlüssel</label>
                      <span className="eye-toggle" onClick={() => setShowKey(!showKey)}>
                        👁️
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                            id="setting_api_key"
                            type={showKey ? "text" : "password"}
                            pattern="^xai-\S*$"
                            maxLength="50"
                            minLength="8"
                            defaultValue={settings.api_key}
                            onChange={(event) => {
                                new_settings.api_key = event.target.value;
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label>
                        Maximale KI Anwtort Zeilenlänge: <strong>{maxLen}</strong>
                    </label>
                    <input
                        id="setting_max_line_len"
                        type="range"
                        min="51"
                        max="249"
                        step="1"
                        defaultValue={settings.max_line_len}
                        onChange={(event) => {
                            new_settings.max_line_len = event.target.value;
                            setMaxLen(new_settings.max_line_len);
                        }}
                    />
                </div>

                <div>
                    <label>
                        KI Antwort Zufälligkeit: <strong>{randomness}</strong>
                    </label>
                    <input
                        id="setting_ki_randomness"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        defaultValue={settings.randomness}
                        onChange={(event) => {
                            new_settings.randomness = event.target.value;
                            setRandomness(new_settings.randomness)
                        }}
                    />
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Button
                        title="Speichern"
                        maxWidth="150px"
                        onButtonClick={() => setSettings(new_settings)}
                    />
                </div>
            </div>
        </BasePage>
    );
}

SettingsPage.propTypes = {
    settings: PropTypes.object,
    setSettings: PropTypes.func
};

export default SettingsPage;
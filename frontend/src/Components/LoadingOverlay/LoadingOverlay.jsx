import React from 'react';
import './LoadingOverlay.css';
import PropTypes from "prop-types";

function LoadingOverlay({ onCancel }) {
    return (
        <div className="loading-overlay">
            <div className="loading-box">
                <button className="close-button" onClick={onCancel}>×</button>
                <div className="loader"></div>
                <p className="loading-text">Laden, bitte warten...</p>
            </div>
        </div>
    );
}

LoadingOverlay.propTypes = {
    onCancel: PropTypes.func.isRequired
}

export default LoadingOverlay;

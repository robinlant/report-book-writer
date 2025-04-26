import BasePage from "../BasePage/BasePage.jsx";
import PropTypes from "prop-types";
import {useState} from "react";
import Day from "../../Components/Day/Day.jsx";
import "./RootPage.css";

function RootPage({ makeApiCall, weekDays, setWeekDays }) {
    return (
        <BasePage>
            <div className="root-page">
                {[...Array(5)].map((_, i) => (
                  <Day key={i} weekDays={weekDays} setWeekDays={setWeekDays} dayId={i} />
                ))}
                <div className="button" onClick={() => {
                    makeApiCall(weekDays)
                }}>Berichtsheft erstellen</div>
            </div>
        </BasePage>
    );
}


RootPage.propTypes = {
    makeApiCall: PropTypes.func,
}

export default RootPage;
import BasePage from "../BasePage/BasePage.jsx";
import PropTypes from "prop-types";
import {useState} from "react";
import Day from "../../Components/Day/Day.jsx";
import "./RootPage.css";

function RootPage({ settings }) {
    const [weekDays, setWeekDays] = useState([ [], [], [], [], [] ])

    return (
        <BasePage>
            <div className="root-page">
                {[...Array(5)].map((_, i) => (
                  <Day key={i} weekDays={weekDays} setWeekDays={setWeekDays} dayId={i} />
                ))}
                <div className="button">Send</div>
            </div>
        </BasePage>
    );
}


RootPage.propTypes = {
    settings: PropTypes.object,
}

export default RootPage;
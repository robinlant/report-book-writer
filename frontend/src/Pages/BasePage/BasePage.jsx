import PropTypes from 'prop-types';

import Header from '../../Components/Header/Header.jsx';
import Footer from "../../Components/Footer/Footer.jsx";

import './BasePage.css'

function BasePage({ children }) {
    return(
        <div className="app">
            <Header/>
                {children}
            <Footer/>
        </div>
    );
}

BasePage.propTypes = {
    children: PropTypes.node
};

export default BasePage;
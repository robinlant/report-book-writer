import PropTypes from "prop-types";
import "./Button.css";


function Button ({title, onButtonClick, maxWidth}) {
    return (
        <div className="button" onClick={onButtonClick} style={{ maxWidth: maxWidth ? maxWidth : undefined }}>
            {title}
        </div>
    );
}

Button.propTypes = {
    title: PropTypes.string,
    onButtonClick: PropTypes.func,
    maxWidth: PropTypes.string
}

export default Button
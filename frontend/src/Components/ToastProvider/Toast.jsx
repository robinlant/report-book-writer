import PropTypes from "prop-types";
import "./Toast.css";

function Toast({ message, type }) {
  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
};

export default Toast;

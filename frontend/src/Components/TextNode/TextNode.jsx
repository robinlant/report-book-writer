import PropTypes from "prop-types";
import "./TextNode.css";

function TextNode({title, text, padding}) {
    text = text.replace(/\n/g, "<br/>");
    padding = padding ? padding : "0";

    return (
        <div className="text_node" style={{ "padding": padding }}>
            <div>
                <h2 className="text_node_title">{title}</h2>
                <div className="text_node_text" dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
        </div>
    );
}

TextNode.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    padding: PropTypes.string
};

export default TextNode;
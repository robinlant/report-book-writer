import BasePage from "./BasePage/BasePage.jsx";
import TextNode from "../Components/TextNode/TextNode.jsx";

function ContactPage() {
    return (
        <BasePage>
            <TextNode padding="0 30px" title="Kontakt" text={`
            Email: <span style="color:darkviolet;">robinlant@proton.me</span>
            `}/>
        </BasePage>
    );
}

export default ContactPage;
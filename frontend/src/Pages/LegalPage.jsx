import BasePage from "./BasePage/BasePage.jsx";
import TextNode from "../Components/TextNode/TextNode.jsx";

function LegalPage() {
    return (
        <BasePage>
            <TextNode
                padding="0 30px"
                title="Rechtlicher Hinweis"
                text={`
Dieses Angebot ist eine nicht-öffentliche, passwortgeschützte Website und richtet sich ausschließlich an 
einen geschlossenen Nutzerkreis. Es erfolgt keine kommerzielle Nutzung oder öffentliche Bereitstellung.\n
Die Nutzung erfolgt auf eigene Verantwortung. Das Angebot wird ohne Gewähr und "wie es ist" bereitgestellt.
                `}
            />n
        </BasePage>
    );
}

export default LegalPage;
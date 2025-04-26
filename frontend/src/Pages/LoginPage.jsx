import PropTypes from "prop-types";
import {useToast} from "../Components/ToastProvider/ToastContext.jsx";

function LoginPage({ setAuth }) {
    const showToast = useToast();
    let passwordValue = "";

    function checkPassword() {
        if (import.meta.env.VITE_PASSWORD && passwordValue === import.meta.env.VITE_PASSWORD){
            setAuth(true)
            localStorage.setItem("authenticated", "true")
        } else {
            showToast("Falsches Password", "error")
        }
    }

    return (
        <div style={{display:"flex", justifyContent: "center", alignItems:"center", height:"100%"}}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"300px",
                height:"100%",
                padding:"50px",
                gap:"20px"
            }}>
                <input type="text" maxLength="50" onChange={(event) => passwordValue = event.target.value}/>
                <div onClick={checkPassword} className="button">Password eingeben</div>
            </div>
        </div>
    );
}

LoginPage.propTypes = {
    setAuth: PropTypes.func
}

export default LoginPage;
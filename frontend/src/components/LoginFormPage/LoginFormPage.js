import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom"
import form_img from "../../images/EvernoteLogo-Form.svg"
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './LoginFormPage.css'
import '../UserForm/UserForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]); 
    const history = useHistory()

    if (sessionUser) return (
        <Redirect to="/"/>
    )
    const submit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login(credential, password)).then(() => history.push("/")).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })
    }

    const demoSubmit = () => {
        return dispatch(login("Demo-lition","password")).then(() => history.push("/"))
    }
    
    return (
        <div className="FormPage">
            <div className="form-container">
                <img className="form-image" src={form_img} alt="Evernote"/>
                <div className="evernote-slogan">Remember everything important.</div>
                <form className="user-inputs" onSubmit={submit}>
                    <input
                        className="user-info"
                        type="text"
                        placeholder="Email address or username"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                    <p className="account-error-message">
                    {errors.credential}
                    </p>
                    <input
                        className="user-info"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                    />
                    <p className="account-error-message">
                    {errors.password}
                    </p>
                    <button className="continue-button" type="submit">
                        Continue
                    </button>
                </form>
                <div className="ask-user-sign-up">Don't have an account?</div>
                <NavLink to="/signup" className="login-page-sign-up-link">Create account</NavLink> 
                <div className="login-options">or</div>
                <button className="demo-login-info" onClick={demoSubmit}>Demo log in</button>
            </div>
        </div>
    );
}

export default LoginFormPage
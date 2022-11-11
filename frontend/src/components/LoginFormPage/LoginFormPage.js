
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom"
import form_img from "../../images/EvernoteLogo-Form.svg"
import { NavLink } from "react-router-dom";
import './LoginFormPage.css'

const LoginFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]); 

    if (sessionUser) return (
        <Redirect to="/"/>
    )
    const submit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login({credential, password})).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
    }
    return (
        <div className="LoginFormPage">
            <div className="form-container">
                <img className="form-image" src={form_img} alt="Evernote"/>
                <div className="evernote-slogan">Remember everything important.</div>
                <form className="login-inputs" onSubmit={submit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>
                        {error}
                        </li>)}
                    </ul>
                    <input
                        className="login-user-info"
                        type="text"
                        placeholder="Email address or username"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                    <input
                        className="login-user-info"
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                    />
                    <button className="continue-button" type="submit">
                        Continue
                    </button>
                </form>
                <div className="ask-user-account">Don't have an account?</div>
                <NavLink to="/signup" className="login-page-sign-up-link">Create account</NavLink> 
            </div>
        </div>
    );
}

export default LoginFormPage
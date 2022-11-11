
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom"
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
                <form onSubmit={submit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>
                        {error}
                        </li>)}
                    </ul>
                    <input
                        type="text"
                        placeholder="Email address or username"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                    <input
                        type="text"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                    />
                    <button className="login" type="submit">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginFormPage
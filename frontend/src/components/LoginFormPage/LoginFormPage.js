
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
        <form onSubmit={submit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>
                    {error}
                </li>)}
            </ul>
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
            />
            <input
                type="text"
                value={password}
                onChange= {(e) => setPassword(e.target.value)}
            />
            <button className="login" type="submit">
                Login
            </button>
        </form>
    </div>
)
}

export default LoginFormPage
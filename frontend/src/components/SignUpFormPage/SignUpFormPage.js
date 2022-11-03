import './SignUpFormPage.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from '../../store/session'

const SignUpFormPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    if (sessionUser) return (
        <Redirect to="/"/>
    )

    const submit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(signUp({username, email, password})).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })

    }
    return (
        <div className="SignUpFormPage">
            <form onSubmit={submit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>
                    {error}
                    </li>)}
                </ul>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    value={password}
                    onChange= {(e) => setPassword(e.target.value)}
                />
                <button className="login" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUpFormPage
import "./SignUpFormPage.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import form_img from "../../images/EvernoteLogo-Form.svg";
import { NavLink } from "react-router-dom";
import "../UserForm/UserForm.css";

const SignUpFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const submit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(signUp({ username, email, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    );
  };

  return (
    <div className="FormPage">
      <div className="form-container">
        <img className="form-image" src={form_img} alt="Evernote" />
        <div className="evernote-slogan">Remember everything important.</div>
        <form className="user-inputs" onSubmit={submit}>
          <input
            className="user-info"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="account-error-message">{errors.username}</p>
          <input
            className="user-info"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="account-error-message">{errors.email}</p>
          <input
            className="user-info"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="account-error-message">{errors.password}</p>
          <button className="continue-button" type="submit">
            Continue
          </button>
        </form>
        <div className="ask-user-login">Already have an account?</div>
        <NavLink to="/login" className="sign-up-page-login-link">
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpFormPage;

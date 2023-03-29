import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/session";
import { Redirect, NavLink, useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;
  const submit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login(credential, password))
      .then(() => history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoSubmit = () => {
    return dispatch(login("Demo-lition", "password")).then(() =>
      history.push("/")
    );
  };

  return (
    <div className="flex justify-center bg-[#f7fcf9] tracking-wide text-[#949494] text-2xl h-full">
      <div className="flex flex-col gap-10 items-center justify-center form-container shadow-xl bg-white my-10 md:p-32 p-8">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <i className="fa-brands fa-evernote text-[#00a82d] text-8xl"></i>
            <strong className="tracking-wide text-6xl md:block hidden text-black">
              Betternote
            </strong>
          </div>
          <div className="text-2xl text-[#555555]">
            Remember everything important.
          </div>
        </div>
        <form
          className="flex flex-col text-center items-center gap-4"
          onSubmit={submit}
        >
          <input
            className="md:w-128 h-18 border p-4 rounded-md outline-none w-96"
            type="text"
            placeholder="Email address or username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
          <p className="text-[#cc4539]">{errors.credential}</p>
          <input
            className="md:w-128 h-18 border p-4 rounded-md outline-none w-96"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-[#cc4539]">{errors.password}</p>
          <button
            className="cursor-pointer bg-[#00a82d] text-white rounded-md py-4 px-32 text-2xl tracking-wide transition ease-in-out hover:bg-[#088c24]"
            type="submit"
          >
            Continue
          </button>
        </form>
        <div className="flex flex-col gap-12 items-center">
          <div>Don't have an account?</div>
          <div className="flex flex-col items-center md:gap-10 gap-8">
            <NavLink
              to="/signup"
              className="text-[#00a82d] text-2xl hover:text-[#088c24] transition ease-in-out"
            >
              Create account
            </NavLink>
            <div className="before:line-through before:content-['\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0'] before:p-2 after:line-through after:content-['\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0'] after:p-2">
              or
            </div>
            <button
              className="text-[#00a82d] text-2xl hover:text-[#088c24] transition ease-in-out"
              onClick={demoSubmit}
            >
              Demo log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

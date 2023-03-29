import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../store/session";
import { NavLink } from "react-router-dom";

const SignUpForm = () => {
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
          <form
            className="flex flex-col text-center items-center gap-4"
            onSubmit={submit}
          >
            <input
              className="md:w-128 h-18 border p-4 rounded-md outline-none w-96"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-[#cc4539]">{errors.username}</p>
            <input
              className="md:w-128 h-18 border p-4 rounded-md outline-none w-96"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-[#cc4539]">{errors.email}</p>
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
          <div className="flex flex-col gap-6 items-center">
            <div>Already have an account?</div>
            <NavLink
              to="/login"
              className="text-[#00a82d] transition ease-in-out hover:text-[#088c24]"
            >
              Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

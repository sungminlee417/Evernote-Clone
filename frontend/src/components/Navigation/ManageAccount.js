import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../store/session";
import { Redirect } from "react-router-dom";

const ManageAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };
  useEffect(() => {
    if (!clicked) return;
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  });

  const submit = () => {
    dispatch(logout()).then(() => history.push("/"));
  };

  if (!sessionUser) return <Redirect to="/" />;
  else {
  }
  return (
    <section className="relative">
      <button onClick={onClick}>
        <i className="fa-solid fa-chevron-down"></i>
      </button>
      <div
        className={`flex flex-col absolute bg-white border rounded-md lg:left-0 right-0 w-96 top-8 shadow-md divide-y ${
          clicked
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="p-4">ACCOUNT</p>
        <div className="flex justify-between items-center p-4">
          <i className="fa-solid fa-check text-blue-500 text-3xl"></i>
          <div className="text-bold text-3xl">{sessionUser.username}</div>
        </div>
        <button
          className="text-start hover:bg-[#f4f4f4] text-xl p-4"
          onClick={submit}
        >
          Sign out {sessionUser.username}
        </button>
      </div>
    </section>
  );
};

export default ManageAccount;

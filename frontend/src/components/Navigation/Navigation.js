import { NavLink } from "react-router-dom"
import { logout } from "../../store/session"
import { useSelector, useDispatch } from "react-redux";

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <ul className="home-page-link">
           <li>
            <NavLink  exact to="/">
                Home Page
            </NavLink>
           </li>
           {!sessionUser && <li>
            <div>
                <NavLink to="/login">
                    Login
                </NavLink>
            </div>
            <div>
                <NavLink to="/signup">
                    Sign Up
                </NavLink>
            </div>
           </li>}
           {sessionUser && <li>
            <button onClick={onLogout}>
                Logout
            </button>
            </li>}
        </ul>
    )

}
export default Navigation
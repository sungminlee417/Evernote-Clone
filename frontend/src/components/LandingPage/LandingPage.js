import "./LandingPage.css"
import { NavLink } from "react-router-dom"
import logo from "../../images/EvernoteLogo.svg"
const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="landing-header">
                <NavLink to="/" className="home-button">
                <img src={logo}/>
                </NavLink>
            </div>
            <div className="content">
                <div className="intro">
                    <div className="intro-text"> Tame your work, organize your life</div>
                    <div className="description">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</div>
                    <NavLink to="/signup" className="sign-up-button">Sign up for free</NavLink> 
                    <NavLink to="/login" className="login-link">Already have an account? Log in</NavLink>
                </div>
                <div className="app-description">
                </div>
            </div>
        </div>
    )
}

export default LandingPage
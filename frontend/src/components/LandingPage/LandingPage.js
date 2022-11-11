import "./LandingPage.css"
import { NavLink } from "react-router-dom"
import evernote_img from "../../images/appimage.png"
const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="content">
                <div className="intro">
                    <div className="intro-text"> Tame your work, organize your life</div>
                    <div className="intro-description">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</div>
                    <NavLink to="/signup" className="sign-up-button">Sign up for free</NavLink> 
                    <NavLink to="/login" className="login-link">Already have an account? Log in</NavLink>
                </div>
                <div className="description">
                    <img className="app-image" src={evernote_img}/>
                    <div className="description-points">
                        <div className="description-points">
                            <div className="description-point1">
                                <div className="description-point-title">WORK ANYWHERE</div>
                                <div className="description-point-info">Keep important info handy — your notes sync automatically to all your devices.</div>
                            </div>
                            <div className="description-point2">
                                <div className="description-point-title">REMEMBER EVERYTHING</div>
                                <div className="description-point-info">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</div>
                            </div>
                            <div className="description-point3">
                                <div className="description-point-title">TURN TO-DO INTO DONE</div>
                                <div className="description-point-info">Bring your notes, tasks, and schedules together to get things done more easily.</div>
                            </div>
                            <div className="description-point4">
                                <div className="description-point-title">FIND THINGS FAST</div>
                                <div className="description-point-info">Get what you need, when you need it with powerful, flexible search capabilities.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage
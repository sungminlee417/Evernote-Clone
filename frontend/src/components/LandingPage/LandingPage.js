import { NavLink } from "react-router-dom";
import evernote_img from "../../images/appimage.png";
import Header from "./Header.js";
import Footer from "./Footer.js";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="md:py-60 md:px-24 py-52 px-10 tracking-wide">
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col md:gap-10 gap-8 items-center text-center font-semibold pb-10">
            <div className="md:text-8xl text-5xl">
              Tame your work, organize your life
            </div>
            <div className="font-medium md:text-3xl text-2xl">
              Remember everything and tackle any project with your notes, tasks,
              and schedule all in one place.
            </div>
            <NavLink
              to="/signup"
              className="bg-[#00a82d] cursor-pointer text-white rounded-md py-8 md:px-32 px-20 text-3xl hover:bg-[#18cc44] transition duration-100 ease-in-out"
            >
              Sign up for free
            </NavLink>
            <NavLink
              to="/login"
              className="cursor-pointer underline text-2xl hover:text-[#00a82d] transition ease-in-out duration-100"
            >
              Already have an account? Log in
            </NavLink>
          </div>
          <div className="flex lg:flex-row flex-col gap-10">
            <img
              className="xl:h-240 lg:h-160 object-contain justify-self-center"
              src={evernote_img}
              alt="evernote-logo"
            />
            <div className="text-2xl">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <div className=" font-semibold tracking-widest">
                    WORK ANYWHERE
                  </div>
                  <div className="leading-10">
                    Keep important info handy — your notes sync automatically to
                    all your devices.
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className=" font-semibold tracking-widest">
                    REMEMBER EVERYTHING
                  </div>
                  <div className="leading-10">
                    Make notes more useful by adding text, images, audio, scans,
                    PDFs, and documents.
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className=" font-semibold tracking-widest">
                    TURN TO-DO INTO DONE
                  </div>
                  <div className="leading-10">
                    Bring your notes, tasks, and schedules together to get
                    things done more easily.
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className=" font-semibold tracking-widest">
                    FIND THINGS FAST
                  </div>
                  <div className="leading-10">
                    Get what you need, when you need it with powerful, flexible
                    search capabilities.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;

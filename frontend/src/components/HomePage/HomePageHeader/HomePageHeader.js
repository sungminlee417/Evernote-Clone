import "./HomePageHeader.css";
const HomePageHeader = () => {
  const today = new Date().toDateString();
  const time = new Date().getHours();
  return (
    <section className="home-page-header">
      <div className="home-page-greeting">
        Good {time > 11 ? "afternoon" : "morning"}!
      </div>
      <div className="header-date">{today}</div>
    </section>
  );
};
export default HomePageHeader;

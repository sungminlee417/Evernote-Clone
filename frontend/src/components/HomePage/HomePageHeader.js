import backgroundImage from "../../images/sean-benesh-wK8LMfHtRoM-unsplash.jpg";

const HomePageHeader = () => {
  const today = new Date().toDateString();
  const time = new Date().getHours();
  return (
    <section
      className="h-[70%] flex justify-between relative p-16 text-white text-shadow-lg shadow-black bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text-3xl absolute top-20 left-20">
        Good
        {time > 11 && time < 18
          ? " afternoon"
          : time > 18 && time < 24
          ? " evening"
          : " morning"}
        !
      </div>
      <div className="text-2xl absolute top-20 right-20">{today}</div>
    </section>
  );
};
export default HomePageHeader;

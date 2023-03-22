const Footer = () => {
  return (
    <section>
      <div className="flex justify-start md:gap-32 gap-24 md:text-2xl text-xl md:mx-24 mx-10 py-10 tracking-wider border-t-black border-t">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/sungminlee417"
          className="flex gap-2 items-center text-black cursor-pointer hover:text-[#00a82d] transition ease-in-out"
        >
          <span>Sungmin Lee</span>
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/hannahlee2"
          className="flex gap-2 items-center text-black cursor-pointer hover:text-[#00a82d] transition ease-in-out"
        >
          <span>Hannah Lee</span>
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
    </section>
  );
};

export default Footer;

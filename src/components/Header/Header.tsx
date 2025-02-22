const Header: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 pt-8 lg:p-[4vh] items-start lg:items-end justify-start">
      <h1 className="text-zinc-200 lg:text-[4vh] text-4xl font-black">
        {'> noteboook _'}
      </h1>
      <a
        href="https://github.com/r-fael/noteboook"
        target="_blank"
        className="text-zinc-700 lg:text-[2vh] text-lg font-black hover:decoration-2 hover:underline"
      >
        by r-fael
      </a>
    </div>
  );
};

export default Header;

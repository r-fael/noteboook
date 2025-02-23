import useBooks from '../../hooks/useBooks';
//@ts-ignore
import LogIn from '../../assets/login.svg?react';
//@ts-ignore
import LogOut from '../../assets/logout.svg?react';

const Header: React.FC = () => {
  const { isLoggedIn, handleSignIn, handleLogOut } = useBooks();
  return (
    <div className="flex flex-row p-4 pt-8 lg:p-[4vh] items-start lg:items-end justify-between">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-start">
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
      <div
        className="bg-zinc-800 rounded-md p-2 flex items-center justify-center hover:cursor-pointer my-2 lg:my-0 hover:bg-zinc-700"
        onClick={() => (isLoggedIn ? handleLogOut() : handleSignIn())}
      >
        {isLoggedIn ? <LogOut /> : <LogIn />}
      </div>
    </div>
  );
};

export default Header;

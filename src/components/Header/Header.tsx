import useBooks from '../../hooks/useBooks';
//@ts-ignore
import Book from '../../assets/book.svg?react';
//@ts-ignore
import Edit from '../../assets/edit.svg?react';

const Header: React.FC = () => {
  const { isEditing, setIsEditing } = useBooks();
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between p-4 pt-8 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-start">
        <h1 className="text-zinc-200 text-4xl font-black">{'> noteboook _'}</h1>
        <h6 className="text-zinc-700 text-lg font-black">by r-fael</h6>
      </div>
      <div
        className="bg-zinc-700 rounded-md p-2 flex items-center justify-center  hover:cursor-pointer hover:bg-zinc-600"
        onClick={() => setIsEditing((isEditing) => !isEditing)}
      >
        {isEditing ? <Edit /> : <Book />}
      </div>
    </div>
  );
};

export default Header;

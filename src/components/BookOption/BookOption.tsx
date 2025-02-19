import { useState } from 'react';
import useBooks, { IBook } from '../../hooks/useBooks';
// @ts-ignore
import Down from '../../assets/down.svg?react';
// @ts-ignore
import Right from '../../assets/right.svg?react';

interface IBookOption {
  book: IBook;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const BookOption: React.FC<IBookOption> = ({ book, setValue }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addPage, selectedPage, selectedBook, handleSelectPage } = useBooks();
  return (
    <div className="flex flex-col p-2 select-none font-black">
      <div
        className={`${
          selectedBook === book.name ? 'bg-zinc-800' : ''
        } flex flex-row gap-2 rounded-sm text-[1rem] hover:bg-zinc-800 p-2  hover:cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Down /> : <Right />}
        <h3 className="">
          {book.name} ({book.pages.length})
        </h3>
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-1">
          {book.pages.map((page, key) => (
            <div
              className={`${
                selectedPage === page.name ? 'bg-zinc-800' : ''
              } rounded-sm text-[0.9rem] hover:bg-zinc-800 hover:cursor-pointer p-1 ml-8 mt-2`}
              key={key}
              onClick={() => {
                setValue(page.content);
                handleSelectPage(book.name, page.name);
              }}
            >
              {page.name}
            </div>
          ))}
          <div
            onClick={() => addPage(book.name)}
            className="rounded-sm text-[0.9rem] hover:bg-zinc-800 hover:cursor-pointer p-1 ml-8 mt-2"
          >
            + add page
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookOption;

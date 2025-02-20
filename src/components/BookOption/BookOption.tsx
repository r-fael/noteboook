import { useState } from 'react';
import useBooks, { IBook } from '../../hooks/useBooks';
// @ts-ignore
import Down from '../../assets/down.svg?react';
// @ts-ignore
import Right from '../../assets/right.svg?react';
import PageOption from '../PageOption/PageOption';

interface IBookOption {
  book: IBook;
}

interface IPageInput {
  constraints: string[];
  bookName: string;
  setPageInputIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageInput: React.FC<IPageInput> = ({
  constraints,
  bookName,
  setPageInputIsOpen,
}) => {
  const { addPage } = useBooks();
  const [error, setError] = useState<boolean>(false);

  const handleValue = (value: string) => {
    if (constraints.includes(value)) {
      setError(true);
    } else {
      setError(false);
      addPage(bookName, value);
      setPageInputIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        className="bg-zinc-800 text-[0.9rem] p-1 ml-8 outline-0 rounded-sm border-3 border-zinc-700 font-black"
        onKeyDown={(e) => {
          console.log(e.currentTarget.value);
          if (e.key === 'Enter') {
            if (e.currentTarget.value.trim() != '') {
              handleValue(e.currentTarget.value);
            } else {
              setPageInputIsOpen(false);
            }
          }
        }}
        onBlur={(e) => {
          console.log(e.target.value);
          if (e.target.value.trim() !== '') {
            handleValue(e.target.value.trim());
          }
          setPageInputIsOpen(false);
        }}
      />
      {error ? (
        <span className="text-[0.8rem] text-red-400  p-1 ml-8 mt-2">
          Error: this page name was already added
        </span>
      ) : null}
    </div>
  );
};

const BookOption: React.FC<IBookOption> = ({ book }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pageInputIsOpen, setPageInputIsOpen] = useState<boolean>(false);
  const { selectedBook } = useBooks();

  return (
    <div className="flex flex-col select-none font-black">
      <div
        className={`${
          selectedBook === book.name ? 'bg-zinc-800' : ''
        } flex flex-row gap-2 items-center rounded-sm text-[1rem] hover:bg-zinc-800 p-2  hover:cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Down /> : <Right />}
        <h3>{book.name}</h3>
        {book.pages.length > 0 ? (
          <h1 className="bg-zinc-700 text-[0.8rem] font-black rounded-4xl px-[0.5rem] h-[1.2rem] flex items-center justify-center">
            {book.pages.length}
          </h1>
        ) : null}
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-2 mt-2">
          {book.pages.map((page, key) => (
            <PageOption book={book} page={page} key={key} />
          ))}
          {pageInputIsOpen ? (
            <PageInput
              setPageInputIsOpen={setPageInputIsOpen}
              bookName={book.name}
              constraints={book.pages?.map((book) => book.name)}
            />
          ) : null}
          <div
            onClick={() => setPageInputIsOpen(true)}
            className="flex rounded-sm text-[0.9rem] w-auto hover:cursor-pointer p-1 ml-8 border-2 hover:border-zinc-300 border-zinc-950 justify-start text-zinc-500 hover:text-zinc-100 transition ease-in"
          >
            + add page
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookOption;

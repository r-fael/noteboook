import useBooks from '../../hooks/useBooks';
import BookOption from '../../components/BookOption/BookOption';
import { useState } from 'react';

interface IBooksList {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface IBookInput {
  constraints: string[];
  setBookInputIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookInput: React.FC<IBookInput> = ({
  constraints,
  setBookInputIsOpen,
}) => {
  const { addBook } = useBooks();

  const [error, setError] = useState<boolean>(false);

  const handleValue = (value: string) => {
    if (constraints.includes(value)) {
      setError(true);
    } else {
      setError(false);
      addBook(value);
      setBookInputIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-[1rem]">
      <input
        autoFocus
        className="bg-zinc-800 p-2 outline-0 rounded-sm border-4 border-zinc-700 font-black"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (e.currentTarget.value.trim() != '') {
              handleValue(e.currentTarget.value);
            } else {
              setBookInputIsOpen(false);
            }
          }
        }}
        onBlur={(e) => {
          if (e.target.value.trim() !== '') {
            handleValue(e.target.value.trim());
          }
          setBookInputIsOpen(false);
        }}
      />
      {error ? (
        <span className="text-xs text-red-400">
          Error: this book name was already added
        </span>
      ) : null}
    </div>
  );
};

const BooksList: React.FC<IBooksList> = () => {
  const { books } = useBooks();
  const [bookInputIsOpen, setBookInputIsOpen] = useState<boolean>(false);

  return (
    <div className="text-xs lg:w-[15vw] w-auto flex flex-col p-2 gap-2 lg:h-[34rem] h-[40rem] overflow-y-auto">
      {books.map((book, key) => (
        <BookOption key={key} book={book} />
      ))}
      {bookInputIsOpen ? (
        <BookInput
          setBookInputIsOpen={setBookInputIsOpen}
          constraints={books.map((book) => book.name)}
        />
      ) : null}
      <div
        className="flex font-black rounded-sm text-[1.1rem] p-2 hover:cursor-pointer justify-start hover:border-zinc-100 border-2 mb-4 border-zinc-950 text-zinc-500 hover:text-zinc-100 transition ease-in"
        onClick={() => setBookInputIsOpen(true)}
      >
        + add book
      </div>
    </div>
  );
};

export default BooksList;

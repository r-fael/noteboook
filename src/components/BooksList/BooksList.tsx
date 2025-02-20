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
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        className="bg-zinc-800 self-center p-2 outline-0 rounded-sm border-4 border-zinc-700 font-black"
        onKeyDown={(e) => {
          console.log(e.currentTarget.value);
          if (e.key === 'Enter') {
            if (e.currentTarget.value.trim() != '') {
              handleValue(e.currentTarget.value);
            } else {
              setBookInputIsOpen(false);
            }
          }
        }}
        onBlur={(e) => {
          console.log(e.target.value);
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
    <div className="text-xs lg:w-[15vw] w-auto flex flex-col p-2">
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
        className="flex font-black rounded-sm text-[1.1rem] hover:bg-zinc-800 p-2 hover:cursor-pointer justify-center hover:border-zinc-100 border-2 my-4 border-zinc-950"
        onClick={() => setBookInputIsOpen(true)}
      >
        + add book
      </div>
    </div>
  );
};

export default BooksList;

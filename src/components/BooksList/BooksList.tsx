import useBooks from '../../hooks/useBooks';
import BookOption from '../../components/BookOption/BookOption';
interface IBooksList {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const BooksList: React.FC<IBooksList> = ({ setValue }) => {
  const { books, addBook } = useBooks();

  return (
    <div className="text-xs lg:w-[12vw] w-auto flex-col p-2">
      {books.map((book, key) => (
        <BookOption key={key} book={book} setValue={setValue} />
      ))}
      <div
        className="flex font-black rounded-sm text-[1.1rem] hover:bg-zinc-800 p-2 hover:cursor-pointer justify-center"
        onClick={addBook}
      >
        + add book
      </div>
    </div>
  );
};

export default BooksList;

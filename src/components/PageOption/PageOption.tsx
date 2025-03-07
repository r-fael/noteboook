import { useState } from 'react';
import useBooks, { IBook, IPage } from '../../hooks/useBooks';

interface IPageOption {
  book: IBook;
  page: IPage;
}

const PageOption: React.FC<IPageOption> = ({ book, page }) => {
  const { handleSelectPage, selectedPage, selectedBook, setValue, editPage } =
    useBooks();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleValue = (value: string) => {
    if (book.pages.map((page) => page.name).includes(value)) {
      setError(true);
    } else {
      setError(false);
      editPage(book.name, page.name, value);
      setIsEditing(false);
    }
  };

  return (
    <>
      <div
        className={`${
          selectedPage === page.name && book.name === selectedBook
            ? 'bg-zinc-800'
            : ''
        } rounded-sm text-[0.9rem] hover:bg-zinc-800 hover:cursor-pointer p-2 pr-4 ml-8`}
        onClick={() => {
          setValue(page.content);
          handleSelectPage(book.name, page.name);
        }}
      >
        {isEditing ? (
          <input
            autoFocus
            defaultValue={page.name}
            className="outline-0 w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.currentTarget.value.trim() != '') {
                  handleValue(e.currentTarget.value);
                } else {
                  setError(false);
                  setIsEditing(false);
                }
              }
            }}
            onBlur={(e) => {
              if (e.target.value.trim() !== '') {
                handleValue(e.target.value.trim());
              }
              setError(false);
              setIsEditing(false);
            }}
          />
        ) : (
          <h4
            className="break-all w-fit"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            {page.name}
          </h4>
        )}
      </div>
      {error ? (
        <span className="text-[0.8rem] text-red-400 mt-2 ml-8">
          Error: this page name was already added
        </span>
      ) : null}
    </>
  );
};

export default PageOption;

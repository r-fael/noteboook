import useBooks, { IBook, IPage } from '../../hooks/useBooks';

interface IPageOption {
  book: IBook;
  page: IPage;
  key: number;
}

const PageOption: React.FC<IPageOption> = ({ book, page, key }) => {
  const { handleSelectPage, selectedPage, selectedBook, setValue } = useBooks();

  return (
    <div
      className={`${
        selectedPage === page.name && book.name === selectedBook
          ? 'bg-zinc-800'
          : ''
      } rounded-sm text-[0.9rem] hover:bg-zinc-800 hover:cursor-pointer p-1 ml-8`}
      key={key}
      onClick={() => {
        setValue(page.content);
        handleSelectPage(book.name, page.name);
      }}
    >
      {page.name}
    </div>
  );
};

export default PageOption;

import Editor, { OnChange } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import Markdown from './components/Markdown/Markdown';
// @ts-ignore
import Down from './assets/down.svg?react';
// @ts-ignore
import Right from './assets/right.svg?react';
import useBooks, { IBook } from './hooks/useBooks';

const options = {
  readOnly: false,
  minimap: { enabled: false },
};

interface IMarkdownRender {
  value: string | undefined;
}

interface IMonacoEditor {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  value: string | undefined;
}

interface IBookOption {
  book: IBook;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Title: React.FC = () => (
  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-start p-8">
    <h1 className="text-zinc-200 text-4xl font-black">{'> noteboook _'}</h1>
    <h6 className="text-zinc-700 text-lg font-black">by r-fael</h6>
  </div>
);

const MonacoEditor: React.FC<IMonacoEditor> = ({ setValue, value }) => {
  const handleEditorChange: OnChange = (value, _) => {
    setValue(value);
  };

  return (
    <div className="m-2 lg:h-[80vh] h-[45rem] lg:w-[40vw] w-auto border-8 border-zinc-800 rounded-sm">
      <Editor
        width="auto"
        height="100%"
        onChange={handleEditorChange}
        theme="vs-dark"
        language="markdown"
        options={options}
        value={value || ''}
      />
    </div>
  );
};

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

const MarkdownRender: React.FC<IMarkdownRender> = ({ value }) => {
  return (
    <div className="lg:h-[80vh] h-[45rem] w-auto overflow-y-scroll flex-1 m-2 border-8 border-zinc-800 p-4 rounded-sm">
      <Markdown content={value || ''} />
    </div>
  );
};

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

function App() {
  const { value, setValue } = useBooks();

  return (
    <div className="font-['Poppins'] w-screen min-h-screen">
      <div className="bg-gray-950 flex flex-col min-h-screen text-zinc-200">
        <Title />
        <div className="flex flex-col lg:flex-row h-max pl-6 pr-6 pb-8 flex-1">
          <BooksList setValue={setValue} />
          <MonacoEditor value={value} setValue={setValue} />
          <MarkdownRender value={value} />
        </div>
      </div>
    </div>
  );
}
export default App;

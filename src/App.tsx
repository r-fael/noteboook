import useBooks from './hooks/useBooks';
import BooksList from './components/BooksList/BooksList';
import MarkdownRender from './components/MarkdownRender/MarkdownRender';
import MonacoEditor from './components/MonacoEditor/MonacoEditor';
import Header from './components/Header/Header';
// @ts-ignore
import ArrowLeft from './assets/arrow_left.svg?react';
// @ts-ignore
import ArrowRight from './assets/arrow_right.svg?react';
// @ts-ignore
import Delete from './assets/delete.svg?react';
// @ts-ignore
import Check from './assets/check.svg?react';
// @ts-ignore
import Close from './assets/close.svg?react';
//@ts-ignore
import Book from './assets/book.svg?react';
//@ts-ignore
import Edit from './assets/edit.svg?react';
import useKey from './hooks/useKey';

function App() {
  const {
    value,
    setValue,
    isEditing,
    selectedBook,
    selectedPage,
    deletePage,
    isConfirmDeleteOpen,
    setIsConfirmDeleteOpen,
    setIsEditing,
    setIsListHidden,
    isListHidden,
  } = useBooks();

  useKey(
    'ControlLeft+KeyE',
    () => {
      if (selectedPage != '' && selectedBook != '') {
        setIsEditing((o) => !o);
      }
    },
    true,
  );

  return (
    <div className="font-['Poppins'] w-screen min-h-screen">
      <div className="bg-gray-950 flex flex-col min-h-screen text-zinc-200">
        <Header />
        <div className="flex flex-col lg:flex-row h-max px-4 pb-8 lg:px-[4vh] flex-1">
          <>
            <div
              onClick={() => setIsListHidden((o) => !o)}
              className="lg:h-[82vh] bg-zinc-800 hover:cursor-pointer hover:bg-zinc-700 rounded-md flex items-center lg:mb-0 mb-4 lg:m-[1vw] lg:mt-0 lg:ml-0 p-2 justify-center"
            >
              <div className="w-[1.5rem] h-[1.5rem] flex justify-center items-center lg:rotate-none rotate-90">
                {isListHidden ? <ArrowRight /> : <ArrowLeft />}
              </div>
            </div>
            {!isListHidden ? <BooksList setValue={setValue} /> : null}
          </>

          <div className="flex flex-col flex-1 gap-2 lg:gap-[2vh]">
            <div
              className={`font-black text-[1.2rem] lg:text-[3vh] break-all justify-between lg:flex items-center flex flex-row lg:flex-row gap-4 ${
                selectedBook === '' || selectedPage === ''
                  ? 'opacity-0 hidden'
                  : ''
              }`}
            >
              <h1 className="lg: ">
                {selectedBook} / {selectedPage}
              </h1>
              {isConfirmDeleteOpen ? (
                <div className="flex gap-4 my-2 lg:my-0 lg:w-auto">
                  <div
                    className="bg-red-900 hover:bg-red-800 rounded-md flex items-center justify-center p-2"
                    onClick={() => deletePage()}
                  >
                    <Check />
                  </div>
                  <div
                    className="bg-green-900 hover:bg-green-800 rounded-md flex items-center justify-center p-2"
                    onClick={() => setIsConfirmDeleteOpen(false)}
                  >
                    <Close />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div
                    className="bg-zinc-800 rounded-md p-2 flex items-center justify-center hover:cursor-pointer my-2 lg:my-0 hover:bg-zinc-700 "
                    onClick={() => setIsEditing((isEditing) => !isEditing)}
                  >
                    {isEditing ? <Edit /> : <Book />}
                  </div>
                  <div
                    className="bg-zinc-800 hover:bg-red-800 rounded-md flex items-center justify-center p-2 my-2 lg:my-0"
                    onClick={() => setIsConfirmDeleteOpen(true)}
                  >
                    <Delete />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row h-max gap-4 lg:justify-between">
              {isEditing ? (
                <MonacoEditor value={value} setValue={setValue} />
              ) : null}
              <MarkdownRender value={value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

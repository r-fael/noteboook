import useBooks from './hooks/useBooks';
import BooksList from './components/BooksList/BooksList';
import MarkdownRender from './components/MarkdownRender/MarkdownRender';
import MonacoEditor from './components/MonacoEditor/MonacoEditor';
import Header from './components/Header/Header';
// @ts-ignore
import ArrowLeft from './assets/arrow_left.svg?react';
// @ts-ignore
import ArrowRight from './assets/arrow_right.svg?react';
import { useState } from 'react';

function App() {
  const { value, setValue, isEditing, selectedBook, selectedPage } = useBooks();
  const [isListHidden, setIsListHidden] = useState<boolean>(false);

  return (
    <div className="font-['Poppins'] w-screen min-h-screen">
      <div className="bg-gray-950 flex flex-col min-h-screen text-zinc-200">
        <Header />
        <div className="flex flex-col lg:flex-row h-max px-4 pb-8 lg:px-[4vh] flex-1">
          <>
            <div
              onClick={() => setIsListHidden((o) => !o)}
              className="lg:h-[80vh] bg-zinc-800 hover:cursor-pointer hover:bg-zinc-700 rounded-md flex items-center mb-4 lg:m-[1vw] lg:mt-0 lg:ml-0 p-2 justify-center"
            >
              <div className="w-[1.5rem] h-[1.5rem] flex justify-center items-center lg:rotate-none rotate-90">
                {isListHidden ? <ArrowRight /> : <ArrowLeft />}
              </div>
            </div>
            {!isListHidden ? <BooksList setValue={setValue} /> : null}
          </>

          <div className="flex flex-col flex-1 gap-2 lg:gap-[1vh]">
            {selectedBook != '' && selectedPage != '' ? (
              <div className="flex font-black text-2xl lg:text-[3vh] break-all">
                <h1>
                  {selectedBook} / {selectedPage}
                </h1>
              </div>
            ) : null}
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

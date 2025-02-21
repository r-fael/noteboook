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
        <div className="flex flex-col lg:flex-row h-max lg:px-6 px-4 pb-8 flex-1">
          <>
            <div
              onClick={() => setIsListHidden((o) => !o)}
              className="lg:h-auto bg-zinc-800 hover:cursor-pointer hover:bg-zinc-700 rounded-md flex items-center mb-4 lg:m-2 lg:mt-0 p-2 justify-center"
            >
              <div className="w-[1.5rem] h-[1.5rem] flex justify-center items-center lg:rotate-none rotate-90">
                {isListHidden ? <ArrowRight /> : <ArrowLeft />}
              </div>
            </div>
            {!isListHidden ? <BooksList setValue={setValue} /> : null}
          </>

          <div className="flex flex-col flex-1 gap-2">
            {selectedBook != '' && selectedPage != '' ? (
              <div className="flex font-black gap-2 text-2xl mx-2">
                <h1>{selectedBook}</h1> / <h1>{selectedPage}</h1>
              </div>
            ) : null}
            <div className="flex flex-col lg:flex-row h-max">
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

import useBooks from './hooks/useBooks';
import BooksList from './components/BooksList/BooksList';
import MarkdownRender from './components/MarkdownRender/MarkdownRender';
import MonacoEditor from './components/MonacoEditor/MonacoEditor';
import Header from './components/Header/Header';

function App() {
  const { value, setValue, isEditing, selectedBook, selectedPage } = useBooks();

  return (
    <div className="font-['Poppins'] w-screen min-h-screen">
      <div className="bg-gray-950 flex flex-col min-h-screen text-zinc-200">
        <Header />
        <div className="flex flex-col lg:flex-row h-max lg:px-6 px-4 pb-8 flex-1">
          <BooksList setValue={setValue} />
          <div className="flex flex-col flex-1">
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

import useBooks from './hooks/useBooks';
import BooksList from './components/BooksList/BooksList';
import MarkdownRender from './components/MarkdownRender/MarkdownRender';
import MonacoEditor from './components/MonacoEditor/MonacoEditor';
import Header from './components/Header/Header';

function App() {
  const { value, setValue, isEditing } = useBooks();

  return (
    <div className="font-['Poppins'] w-screen min-h-screen">
      <div className="bg-gray-950 flex flex-col min-h-screen text-zinc-200">
        <Header />
        <div className="flex flex-col lg:flex-row h-max lg:px-6 px-4 pb-8 flex-1">
          <BooksList setValue={setValue} />
          {isEditing ? (
            <MonacoEditor value={value} setValue={setValue} />
          ) : null}
          <MarkdownRender value={value} />
        </div>
      </div>
    </div>
  );
}
export default App;

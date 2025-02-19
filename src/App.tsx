import useBooks from './hooks/useBooks';
import BooksList from './components/BooksList/BooksList';
import MarkdownRender from './components/MarkdownRender/MarkdownRender';
import MonacoEditor from './components/MonacoEditor/MonacoEditor';
import Title from './components/Title/Title';

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

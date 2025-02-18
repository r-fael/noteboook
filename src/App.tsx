import Editor, { OnChange } from '@monaco-editor/react';
import { useState } from 'react';
import Markdown from './components/Markdown/Markdown';

const options = {
  readOnly: false,
  minimap: { enabled: false },
};

function App() {
  const [value, setValue] = useState<string | undefined>('');

  var books: string[] = ['Projects', 'College', 'Work'];

  const handleEditorChange: OnChange = (value, _) => {
    setValue(value);
  };

  return (
    <div className="font-['Poppins'] w-screen min-h-screen">
      <div className="bg-gray-950 flex-row min-h-screen text-zinc-200">
        <h1 className="text-zinc-200 text-4xl font-black p-8">
          {'> noteboook _'}
        </h1>
        <div className="flex flex-row h-full pl-6 pr-6 pb-8">
          <div className="text-xs w-[10vw] flex-col p-2">
            {books.map((book) => (
              <h3 className="rounded-sm text-xl hover:bg-zinc-800 hover:cursor-pointer p-2 mb-2">
                {book}
              </h3>
            ))}
          </div>
          <div className="m-2 border-8 border-zinc-800 rounded-sm">
            <Editor
              width="45vw"
              height="100%"
              onChange={handleEditorChange}
              theme="vs-dark"
              language="markdown"
              options={options}
              defaultValue=""
            />
          </div>
          <div className="h-auto w-[45vw] m-2 border-8 border-zinc-800 p-4 rounded-sm">
            <Markdown content={value || ''} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

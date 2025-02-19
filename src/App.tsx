import Editor, { OnChange } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import Markdown from './components/Markdown/Markdown';
// @ts-ignore
import Down from './assets/down.svg?react';
// @ts-ignore
import Right from './assets/right.svg?react';

const options = {
  readOnly: false,
  minimap: { enabled: false },
};

interface IPage {
  name: string;
  content: string;
}

interface IBook {
  name: string;
  pages: IPage[];
}

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
    <div className="m-2 h-auto lg:w-[40vw] w-auto border-8 border-zinc-800 rounded-sm">
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

  return (
    <div className="flex flex-col p-2 select-none font-black">
      <div
        className="flex flex-row gap-2 rounded-sm text-[1rem] hover:bg-zinc-800 p-2  hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Down /> : <Right />}
        <h3 className="">
          {book.name} ({book.pages.length})
        </h3>
      </div>
      {isOpen && book.pages.length > 0 ? (
        <div className="flex flex-col gap-4">
          {book.pages.map((page, key) => (
            <span
              className="rounded-sm text-[0.9rem] hover:bg-zinc-800 hover:cursor-pointer p-1 ml-8 mt-2"
              key={key}
              onClick={() => setValue(page.content)}
            >
              {page.name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const MarkdownRender: React.FC<IMarkdownRender> = ({ value }) => {
  return (
    <div className="h-auto w-auto overflow-y-scroll flex-1 m-2 border-8 border-zinc-800 p-4 rounded-sm">
      <Markdown content={value || ''} />
    </div>
  );
};

interface IBooksList {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const BooksList: React.FC<IBooksList> = ({ setValue }) => {
  const [books, setBooks] = useState<IBook[]>([]);

  let newBook: IBook = {
    name: 'new book',
    pages: [],
  };
  let booksMock: IBook[] = [
    {
      name: 'Projects',
      pages: [
        {
          name: 'rafael',
          content: `
# **Título de Nível 1**  
## **Título de Nível 2**  
### **Título de Nível 3**  
#### **Título de Nível 4**  
##### **Título de Nível 5**  
###### **Título de Nível 6**  

---

## **Ênfase**  
*Texto em itálico* ou _assim_.  
**Texto em negrito** ou __assim__.  
***Texto em negrito e itálico*** ou **_assim_**.  
~~Texto riscado~~.

---

## **Listas**  

### Lista não ordenada:
- Item 1  
- Item 2  
  - Subitem 2.1  
  - Subitem 2.2  
- Item 3  

### Lista ordenada:
1. Primeiro item  
2. Segundo item  
  1. Subitem 2.1  
  2. Subitem 2.2  
3. Terceiro item  

---

## **Citações**
> Isso é uma citação de bloco.  
> Pode ter várias linhas.  

---

## **Código**  

Texto com \`código inline\`.  

Bloco de código:  

  \`\`\`python
def hello():
    print("Olá, Mundo!")
\`\`\`
`,
        },
      ],
    },
    { name: 'College', pages: [] },
    { name: 'Work', pages: [] },
  ];

  useEffect(() => {
    setBooks(booksMock);
  }, []);

  const addBook = () => {
    setBooks((books) => [...books, newBook]);
  };

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
  const [value, setValue] = useState<string | undefined>('');

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

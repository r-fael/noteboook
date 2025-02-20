import { createContext, useContext, useEffect, useState } from 'react';

const newBook: IBook = {
  name: 'new book',
  pages: [],
};

const newPage: IPage = {
  name: 'new page',
  content: '# test',
};

const booksMock: IBook[] = [
  {
    name: 'Projects',
    pages: [
      {
        name: 'example',
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
---
# **Tabela**
| Produto   | Preço  | Estoque  |
|:---------:|:------:|:--------:|
| Notebook  | R$3000 |    10    |
| Mouse     | R$100  |    50    |

`,
      },
    ],
  },
  { name: 'College', pages: [] },
  { name: 'Work', pages: [] },
];

interface IBookContext {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  value: string | undefined;
  addPage: (book: string, page: string) => void;
  addBook: (bookName: string) => void;
  books: IBook[];
  selectedBook: string;
  selectedPage: string;
  handleSelectPage: (book: string, page: string) => void;
  isEditing: boolean;
  editBook: (bookName: string, newBookName: string) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editPage: (bookName: string, pageName: string, newPageName: string) => void;
}

const BookContext = createContext<IBookContext>({
  books: [],
  addBook: () => {},
  addPage: () => {},
  value: '',
  setValue: () => {},
  handleSelectPage: () => {},
  selectedBook: '',
  selectedPage: '',
  isEditing: false,
  setIsEditing: () => {},
  editBook: () => {},
  editPage: () => {},
});

interface IBookProvider {
  children: React.ReactNode;
}

export interface IBook {
  name: string;
  pages: IPage[];
}

export interface IPage {
  name: string;
  content: string;
}

export const BookProvider: React.FC<IBookProvider> = ({ children }) => {
  const [value, setValue] = useState<string | undefined>('');
  const [books, setBooks] = useState<IBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setBooks(booksMock);
  }, []);

  const addBook = (bookName: string) => {
    setBooks((books) => [...books, { ...newBook, name: bookName }]);
  };

  const addPage = (bookName: string, pageName: string) => {
    let newBooks = [...books];
    newBooks = newBooks.map((book) => {
      if (book.name == bookName) {
        book.pages = [...book.pages, { ...newPage, name: pageName }];
      }
      return book;
    });
    setBooks(newBooks);
  };

  const editBook = (bookName: string, newBookName: string) => {
    let newBooks = [...books];
    newBooks = newBooks.map((book) => {
      if (book.name == bookName) {
        return { ...book, name: newBookName };
      }
      return book;
    });
    setBooks(newBooks);
  };

  const editPage = (
    bookName: string,
    pageName: string,
    newPageName: string,
  ) => {
    let newBooks = [...books];
    newBooks = newBooks.map((book) => {
      if (book.name == bookName) {
        book.pages = book.pages.map((page) => {
          if (page.name === pageName) {
            page.name = newPageName;
          }
          return page;
        });
      }
      return book;
    });
    setBooks(newBooks);
  };

  const handleSelectPage = (book: string, page: string) => {
    setSelectedBook(book);
    setSelectedPage(page);
  };

  return (
    <BookContext.Provider
      value={{
        value,
        setValue,
        books,
        addBook,
        addPage,
        selectedBook,
        selectedPage,
        handleSelectPage,
        isEditing,
        setIsEditing,
        editBook,
        editPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

let context = () => useContext(BookContext);
export default context;

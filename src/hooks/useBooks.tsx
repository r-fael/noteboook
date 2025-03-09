import { createContext, useContext, useEffect, useState } from 'react';
import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, googleProvider, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { tutorial } from '../tutorial';

const newBook: IBook = {
  name: 'new book',
  pages: [],
};

const newPage: IPage = {
  name: '',
  content: '',
};

const booksMock: IBook[] = [
  {
    name: '▶️ Getting started',
    pages: [
      {
        name: '🎯 Tutorial',
        content: tutorial,
      },
    ],
  },
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
  handleEditContent: (content: string) => void;
  deletePage: () => void;
  deleteBook: (bookName: string) => void;
  isConfirmDeleteOpen: boolean;
  setIsConfirmDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogOut: () => void;
  handleSignIn: () => void;
  isLoggedIn: boolean;
  userInitials: string;
  isMobile: boolean;
  isListHidden: boolean;
  setIsListHidden: React.Dispatch<React.SetStateAction<boolean>>;
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
  isConfirmDeleteOpen: false,
  setIsConfirmDeleteOpen: () => {},
  editBook: () => {},
  editPage: () => {},
  handleEditContent: () => {},
  deletePage: () => {},
  deleteBook: () => {},
  handleLogOut: () => {},
  handleSignIn: () => {},
  isLoggedIn: false,
  userInitials: '',
  isMobile: false,
  isListHidden: false,
  setIsListHidden: () => {},
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
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] =
    useState<boolean>(false);
  const [useLocalStorage, setUseLocalStorage] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isListHidden, setIsListHidden] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        fetchText(user);
      } else {
        setUserInfo(null);
        getFromLocalStorage();
      }
    });
    return () => unsubscribe();
  }, [isLoggedIn]);

  const getFromLocalStorage = () => {
    const stateParsed = JSON.parse(localStorage.getItem('books') || '[]');
    if (stateParsed.length === 0) {
      setBooks(booksMock);
    } else {
      setBooks(stateParsed);
    }
    setUseLocalStorage(true);
  };

  useEffect(() => {
    if (useLocalStorage) localStorage.setItem('books', JSON.stringify(books));
    else if (userInfo) saveText();
  }, [books]);

  const fetchText = async (user: User) => {
    if (user) {
      setIsLoggedIn(true);
      const textDoc = doc(db, 'noteboooks', user.uid);
      const docSnap = await getDoc(textDoc);
      if (docSnap.exists()) {
        setBooks(JSON.parse(docSnap.data().content));
      } else {
        setBooks([]);
      }
      setUseLocalStorage(false);
    }
  };

  const saveText = async () => {
    if (books && userInfo) {
      await setDoc(doc(db, 'noteboooks', userInfo.uid), {
        content: JSON.stringify(books),
        uid: userInfo.uid,
      });
    }
  };

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
        if (book.name == selectedBook) {
          setSelectedBook(newBookName);
        }
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
            if (bookName === selectedBook && page.name === selectedPage) {
              setSelectedPage(newPageName);
            }
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
    setIsConfirmDeleteOpen(false);
    if (isMobile) {
      setIsListHidden(true);
    }
  };

  const handleEditContent = (content: string) => {
    let newBooks = [...books];
    newBooks = newBooks.map((book) => {
      if (book.name == selectedBook) {
        book.pages = book.pages.map((page) => {
          if (page.name === selectedPage) {
            page.content = content;
          }
          return page;
        });
      }
      return book;
    });
    setBooks(newBooks);
  };

  const deletePage = () => {
    let newBooks = [...books];
    newBooks = newBooks.map((book) => {
      if (book.name == selectedBook) {
        const pageToDelete = book.pages.findIndex(
          (o) => o.name === selectedPage,
        );
        book.pages.splice(pageToDelete, 1);
      }
      return book;
    });

    const nextPage = books.find((b) => b.name === selectedBook)?.pages[0];
    if (nextPage) {
      setValue(nextPage.content);
      setSelectedPage(nextPage.name);
    } else {
      setIsEditing(false);
      setSelectedBook('');
      setSelectedPage('');
      setValue('');
    }
    setIsConfirmDeleteOpen(false);
    setBooks(newBooks);
  };

  const deleteBook = (bookName: string) => {
    let newBooks = [...books];
    const bookIndex = books.findIndex((b) => b.name === bookName);
    newBooks.splice(bookIndex, 1);
    setBooks(newBooks);
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoggedIn(true);
      setValue('');
      setSelectedPage('');
      setSelectedBook('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setValue('');
      setSelectedPage('');
      setSelectedBook('');
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInitials = () => {
    return (
      userInfo?.displayName
        ?.split(' ')
        .map((n) => n[0].toLocaleUpperCase())
        .join('') || ''
    );
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
        handleEditContent,
        deletePage,
        isConfirmDeleteOpen,
        setIsConfirmDeleteOpen,
        deleteBook,
        handleLogOut,
        handleSignIn,
        isLoggedIn,
        isMobile,
        userInitials: getUserInitials(),
        isListHidden,
        setIsListHidden,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

let context = () => useContext(BookContext);
export default context;

import { useEffect, useState } from 'react';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase-config';
import useMainContentRouter from './useMainContentRouter';
import useUserData from './useUserData';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearGoogleBooksSearch, fetchGoogleBooks, fetchMoreGoogleBooks } from '../features/books/googleBooksSlice';
import { setCurrentBook, clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { 
  selectGoogleBooksError, 
  selectGoogleBooksStatus, 
  selectGoogleBooksVolumes 
} from '../features/books/googleBooksSelectors';
import type { BookItem } from '../types/books';
import type { CurrentBookInitialState } from '../types/redux';
import { selectUserProfileUid, selectUserProfileStoredBooks } from '../features/userProfile/userProfileSelectors';
import { 
  selectCurrentBook, 
  selectCurrentBookId, 
  selectCurrentBookTitle, 
  selectCurrentBookAuthors 
} from '../features/currentBook/currentBookSelectors';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useBooksGrid = () => {

  const { isChat, switchContent } = useMainContentRouter();
  const { storeBooksById } = useUserData();

  const [query, setQuery] = useState<string>("");
  const [displayBooks, setDisplayBooks] = useState<boolean>(false);
  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const currentUserUid: string | null = useAppSelector(selectUserProfileUid);

  const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);

  const booksVolumes: BookItem[] = useAppSelector(selectGoogleBooksVolumes);
  const booksStatus: string = useAppSelector(selectGoogleBooksStatus);
  const booksError: string | null = useAppSelector(selectGoogleBooksError);

  const currentBook: CurrentBookInitialState = useAppSelector(selectCurrentBook);

  const currentBookId: string | null = useAppSelector(selectCurrentBookId);
  const currentBookTitle: string | null = useAppSelector(selectCurrentBookTitle);
  const currentBookAuthors: string[] | null = useAppSelector(selectCurrentBookAuthors);

  const handleBooksSearch = (e: React.FormEvent, query: string) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(clearGoogleBooksSearch());
      dispatch(fetchGoogleBooks(query));
    }
    setDisplayBooks(true);
  };

  const handleLoadMoreBooks = () => {
    dispatch(fetchMoreGoogleBooks());
  };

  const autoSaveBook = (checked: boolean): void => {
    setCheckboxState(checked);
  }

  const handleVolumeSelection = async (volumeId: string, volumeTitle: string, volumeAuthors: string[]) => {
    dispatch(clearCurrentBook());
    dispatch(setCurrentBook({bookId: volumeId, bookTitle: volumeTitle, bookAuthors: volumeAuthors}));
    if(checkboxState && userStoredBooks.length < 3){
      try {   
        if(!currentUserUid) throw new Error ("There's no loged user.")
        const userDocRef = doc(db, USERS_COLLECTION, currentUserUid);
        await updateDoc(userDocRef, {
          storedBookIds: arrayUnion(volumeId) 
        });
        storeBooksById(currentUserUid);
      } catch (error) {
        console.error("Failed loading data", error);
      }
    }else if(checkboxState){
      return alert("You can't store more than 3 books. Please, remove some. In 'settings' you can recover any chat where you have written.")
    }
    if(!isChat){
        switchContent("chatRoom");
    };
  }

  useEffect(() => {
    currentBookId ? console.log(currentBookId) : console.log("Unable to get book's Id");
    currentBookTitle ? console.log("title: ", currentBookTitle) : console.log("Unable to get book's author");
    currentBookAuthors ? console.log("authors :", currentBookAuthors.join(", ")) : console.log("Unable to get book's title");
  }, [currentBook]);

  return { 
    query, 
    setQuery, 
    displayBooks, 
    booksVolumes, 
    booksStatus, 
    booksError,
    checkboxState,
    autoSaveBook,
    handleBooksSearch, 
    handleLoadMoreBooks,
    handleVolumeSelection }

}

export default useBooksGrid;
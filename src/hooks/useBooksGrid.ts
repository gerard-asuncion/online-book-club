import { useState } from 'react';
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
import type { BookItem } from '../types/booksTypes';

const useBooksGrid = () => {

  const { isChat, switchContent } = useMainContentRouter();
  const { addBookToProfile } = useUserData();

  const [query, setQuery] = useState<string>("");
  const [displayBooks, setDisplayBooks] = useState<boolean>(false);
  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const booksVolumes: BookItem[] = useAppSelector(selectGoogleBooksVolumes);
  const booksStatus: string = useAppSelector(selectGoogleBooksStatus);
  const booksError: string | null = useAppSelector(selectGoogleBooksError);

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
    if(checkboxState){
      addBookToProfile(volumeId);
    };
    if(!isChat){
      switchContent("chatRoom");
    };
    console.log('Selected volume title:', volumeTitle);
    console.log('Selected volume ID:', volumeId);
  }

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
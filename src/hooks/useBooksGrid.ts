import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  clearGoogleBooksSearch, 
  fetchGoogleBooks, 
  fetchMoreGoogleBooks 
} from '../features/googleBooks/googleBooksSlice';
import { 
  selectGoogleBooksError, 
  selectGoogleBooksStatus, 
  selectGoogleBooksVolumes 
} from '../features/googleBooks/googleBooksSelectors';
import type { BookItem } from '../types/booksTypes';

const useBooksGrid = () => {

  const [query, setQuery] = useState<string>("");
  const [displayBooks, setDisplayBooks] = useState<boolean>(false);
  const [storeCheckboxState, setStoreCheckboxState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const booksVolumes: BookItem[] = useAppSelector(selectGoogleBooksVolumes);
  const booksStatus: string = useAppSelector(selectGoogleBooksStatus);
  const booksError: string | null = useAppSelector(selectGoogleBooksError);

  const handleBooksSearch = (e: React.FormEvent, query: string): void => {
    e.preventDefault();
    if(!query.trim()) return;
    dispatch(clearGoogleBooksSearch());
    dispatch(fetchGoogleBooks(query));
    setDisplayBooks(true);
  };

  const handleLoadMoreBooks = (): void => {
    dispatch(fetchMoreGoogleBooks());
  };

  const autoSaveBook = (checked: boolean): void => {
    setStoreCheckboxState(checked);
  }

  return { 
    query, 
    setQuery,
    displayBooks, 
    booksVolumes, 
    booksStatus, 
    booksError,
    storeCheckboxState,
    autoSaveBook,
    handleBooksSearch, 
    handleLoadMoreBooks,
  }

}

export default useBooksGrid;
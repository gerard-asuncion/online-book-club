import { useState } from 'react';
import useMainContentRouter from './useMainContentRouter';
import useUserData from './useUserData';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  clearGoogleBooksSearch, 
  fetchGoogleBooks, 
  fetchMoreGoogleBooks 
} from '../features/googleBooks/googleBooksSlice';
import { setCurrentBook, clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { selectUserProfilePremium } from '../features/userProfile/userProfileSelectors';
import { 
  selectGoogleBooksError, 
  selectGoogleBooksStatus, 
  selectGoogleBooksVolumes 
} from '../features/googleBooks/googleBooksSelectors';
import type { BookItem } from '../types/booksTypes';

const useBooksGrid = () => {

  const { isChat, switchContent } = useMainContentRouter();
  const { addBookToProfile } = useUserData();

  const [query, setQuery] = useState<string>("");
  const [displayBooks, setDisplayBooks] = useState<boolean>(false);
  const [storeCheckboxState, setStoreCheckboxState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

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

  const handleVolumeSelection = async (volumeId: string, volumeTitle: string, volumeAuthors: string[]): Promise<void> => {
    if(!isPremiumUser){
      const selectionConfirmed: boolean = window.confirm(`Do you want to select the book "${volumeTitle}"?`);
      if(!selectionConfirmed) return;
    }
    dispatch(clearCurrentBook());
    dispatch(setCurrentBook({bookId: volumeId, bookTitle: volumeTitle, bookAuthors: volumeAuthors}));
    if(storeCheckboxState){
      addBookToProfile(volumeId);
    };
    if(!isChat){
      switchContent("chatRoom");
    };
    if(import.meta.env.DEV){
      console.log('Selected volume title:', volumeTitle);
      console.log('Selected volume ID:', volumeId);
    }
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
    handleVolumeSelection }

}

export default useBooksGrid;
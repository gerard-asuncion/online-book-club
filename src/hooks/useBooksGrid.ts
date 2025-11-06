import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearGoogleBooksSearch, fetchGoogleBooks, fetchMoreGoogleBooks } from '../features/books/googleBooksSlice';
import { setCurrentBook, clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { selectGoogleBooksError, selectGoogleBooksStatus, selectGoogleBooksVolumes } from '../features/books/googleBooksSelectors';
import type { BookItem } from '../types/books';
import type { CurrentBookInitialState } from '../types/redux';
import { selectCurrentBook, selectCurrentBookId, selectCurrentBookTitle, selectCurrentBookAuthors } from '../features/currentBook/currentBookSelectors';

const useBooksGrid = () => {

  const [query, setQuery] = useState<string>("");
  const [displayBooks, setDisplayBooks] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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

  const handleVolumeSelection = (volumeId: string, volumeTitle: string, volumeAuthors: string[]) => {
    dispatch(clearCurrentBook());
    dispatch(setCurrentBook({bookId: volumeId, title: volumeTitle, authors: volumeAuthors}));
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
    handleBooksSearch, 
    handleLoadMoreBooks,
    handleVolumeSelection }

}

export default useBooksGrid;
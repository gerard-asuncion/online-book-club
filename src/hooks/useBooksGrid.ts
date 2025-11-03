import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearBookSearch, fetchBooks } from '../features/books/booksSlice';
import { selectBooksErrorState, selectBooksStatusState, selectBooksVolumesState } from '../features/books/booksSelectors';
import type { BookItem } from '../types/books';

const useBooksGrid = () => {

  const [query, setQuery] = useState<string>("");
  const [displayBooks, setDisplayBooks] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const booksVolumes: BookItem[] = useAppSelector(selectBooksVolumesState);

  const handleBooksSearch = (e: React.FormEvent, query: string) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(clearBookSearch());
      dispatch(fetchBooks(query));
    }
    setDisplayBooks(true);
  };

  return { query, setQuery, displayBooks, booksVolumes, handleBooksSearch }

}

export default useBooksGrid;
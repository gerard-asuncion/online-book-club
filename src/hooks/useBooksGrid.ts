import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearBookSearch, fetchBooks, fetchMoreBooks } from '../features/books/booksSlice';
import { setBookId, setBookInfo, clearBookData } from '../features/bookRoom/bookRoomSlice';
import { selectBooksErrorState, selectBooksStatusState, selectBooksVolumesState } from '../features/books/booksSelectors';
import type { VolumeInfo, BookItem } from '../types/books';
import { selectBookAuthor, selectBookId, selectBookTitle } from '../features/bookRoom/bookRoomSelectors';

const useBooksGrid = () => {

  const [query, setQuery] = useState<string>("");
  const [displayBooks, setDisplayBooks] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const booksVolumes: BookItem[] = useAppSelector(selectBooksVolumesState);
  const booksStatus: string = useAppSelector(selectBooksStatusState);
  const booksError: string | null = useAppSelector(selectBooksErrorState);

  const selectedBookId: string | null = useAppSelector(selectBookId);
  const selectedBookTitle: string | null = useAppSelector(selectBookTitle);
  const selectedBookAuthors: string[] | null = useAppSelector(selectBookAuthor);

  const handleBooksSearch = (e: React.FormEvent, query: string) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(clearBookSearch());
      dispatch(fetchBooks(query));
    }
    setDisplayBooks(true);
  };

  const handleLoadMoreBooks = () => {
    dispatch(fetchMoreBooks());
  };

  const handleVolumeSelection = (id: string, volumeInfo: VolumeInfo) => {
    dispatch(clearBookData());
    dispatch(setBookId({ bookId: id }));
    dispatch(setBookInfo({ title: volumeInfo.title, authors: volumeInfo.authors }));
  }

  useEffect(() => {
    selectedBookId ? console.log(selectedBookId) : console.log("Unable to get book's Id");
    selectedBookTitle ? console.log("title: ", selectedBookTitle) : console.log("Unable to get book's author");
    selectedBookAuthors ? console.log("authors :", selectedBookAuthors.join(", ")) : console.log("Unable to get book's title");
  }, [selectedBookId]);

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
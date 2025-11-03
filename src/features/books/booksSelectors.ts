import type { RootState } from '../../app/store';
import type { BookItem } from '../../types/books';
import type { BooksSliceInitialState } from '../../types/redux';

export const selectBooksState = (state: RootState): BooksSliceInitialState => state.books;

export const selectBooksVolumesState = (state: RootState): BookItem[] => state.books.volumes;
export const selectBooksStatusState = (state: RootState): string => state.books.status;
export const selectBooksErrorState = (state: RootState): string | null => state.books.error;

import type { RootState } from '../../app/store';
import type { BookItem } from '../../types/booksTypes';
import type { GoogleBooksSliceInitialState } from '../../types/redux';

export const selectGoogleBooks = (state: RootState): GoogleBooksSliceInitialState => state.googleBooks;

export const selectGoogleBooksVolumes = (state: RootState): BookItem[] => state.googleBooks.volumes;
export const selectGoogleBooksStatus = (state: RootState): string => state.googleBooks.status;
export const selectGoogleBooksError = (state: RootState): string | null => state.googleBooks.error;

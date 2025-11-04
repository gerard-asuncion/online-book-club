import type { RootState } from '../../app/store';
import type { CurrentBookInitialState } from '../../types/redux';

export const selectCurrentBook = (state: RootState): CurrentBookInitialState => state.currentBook;

export const selectCurrentBookId = (state: RootState): string | null => state.currentBook.bookId;
export const selectCurrentBookTitle = (state: RootState): string | null => state.currentBook.bookTitle;
export const selectCurrentBookAuthors = (state: RootState): string[] => state.currentBook.bookAuthors;
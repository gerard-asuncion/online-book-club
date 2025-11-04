import type { RootState } from '../../app/store';

export const selectBookRoom = (state: RootState): string | null => state.bookRoom.bookRoom;

export const selectBookId = (state: RootState): string | null => state.bookRoom.bookId;
export const selectBookTitle = (state: RootState): string | null => state.bookRoom.bookTitle;
export const selectBookAuthor = (state: RootState): string[] | null => state.bookRoom.bookAuthors;
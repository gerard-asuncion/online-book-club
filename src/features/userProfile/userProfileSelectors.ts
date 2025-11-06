import type { RootState } from '../../app/store';
import type { BookItem } from '../../types/books';

export const selectUserProfileUid = (state: RootState): string | null => 
    state.userProfile.userProfileUid;

export const selectUserProfileStoredBooks = (state: RootState): BookItem[]  => 
    state.userProfile.storedBooks;

export const selectUserProfileFetchStoredBooksStatus = (state: RootState): string => 
    state.userProfile.fetchStoredBooksStatus;

export const selectUserProfileFetchStoredBooksError = (state: RootState): string | null => 
    state.userProfile.fetchStoredBooksError;
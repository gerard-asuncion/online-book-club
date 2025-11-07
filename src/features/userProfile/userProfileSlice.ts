import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfileInitialState } from '../../types/redux';
import type { BookItem } from '../../types/booksTypes';

const BOOKS_API_URL = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;

const initialState: UserProfileInitialState = {
  userProfileUid: null,
  userProfileUsername: null,
  userProfilePremium: false,
  storedBooks: [],
  fetchStoredBooksStatus: 'idle',
  fetchStoredBooksError: null,
};

export const fetchStoredBooks = createAsyncThunk<
  BookItem[],
  string[],
  { rejectValue: string }
>(
  'storedBooks/fetchStoredBooks',
  async (bookIds, { rejectWithValue }) => {

    if (bookIds.length === 0) {
      return [];
    }
    
    try {
        const fetchPromises = bookIds.map(bookId => 
            axios.get(`${BOOKS_API_URL}/${bookId}`)
        );

      const responses = await Promise.all(fetchPromises);
      
      const booksData = responses.map(response => response.data as BookItem);
      
      return booksData;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue('Failed to fetch one or more stored books.');
      }
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfileUid: (state, action: PayloadAction<{ userProfileUid: string | null }>) => {
      state.userProfileUid = action.payload.userProfileUid;
    },
    setUserProfileUsername: (state, action: PayloadAction<{ userProfileUsername: string | null }>) => {
      state.userProfileUsername = action.payload.userProfileUsername;
    },
    setUserProfilePremium: (state, action: PayloadAction<{ userProfilePremium: boolean }>) => {
      state.userProfilePremium = action.payload.userProfilePremium;
    },
    clearUserProfile: (state) => {
      state.userProfileUid = null;
      state.userProfileUsername = null;
      state.storedBooks = [];
      state.fetchStoredBooksStatus = 'idle';
      state.fetchStoredBooksError = null;
    },
    clearAllStoredBooks: (state) => {
      state.storedBooks = [];
      state.fetchStoredBooksStatus = 'idle';
      state.fetchStoredBooksError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoredBooks.pending, (state) => {
        state.fetchStoredBooksStatus = 'loading';
      })
      .addCase(fetchStoredBooks.fulfilled, (state, action) => {
        state.fetchStoredBooksStatus = 'succeeded';
        state.storedBooks = action.payload;
      })
      .addCase(fetchStoredBooks.rejected, (state, action) => {
        state.fetchStoredBooksStatus = 'failed';
        state.fetchStoredBooksError = action.payload as string;
      });
  },
});

export const { 
  setUserProfileUid,
  setUserProfileUsername,
  setUserProfilePremium,
  clearUserProfile,
  clearAllStoredBooks
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
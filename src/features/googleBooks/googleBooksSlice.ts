import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { GoogleBooksSliceInitialState } from '../../types/redux';
import type { BookItem } from '../../types/booksTypes';
import type { RootState } from '../../app/store';
import type { AxiosResponse } from 'axios';

const BOOKS_API_URL: string = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;

const initialState: GoogleBooksSliceInitialState = {
  volumes:[],
  status: 'idle', 
  error: null,
  currentQuery: ''
};

export const fetchGoogleBooks = createAsyncThunk<
  BookItem[],
  string,
  { rejectValue: string }
>(
  'books/fetchBooks',
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get(BOOKS_API_URL, {
        params: {
          q: searchQuery,
          maxResults: 40
        }
      });
      return response.data.items as BookItem[] || [];
    
    } catch (error) {

      if (axios.isAxiosError(error)) {
        const apiError: string = error.response?.data?.error?.message;
        return rejectWithValue(apiError || 'Unable to contact API.');
      }
      return rejectWithValue('Unexpected error.');
    }
  }
);

export const fetchMoreGoogleBooks = createAsyncThunk<
  BookItem[],
  void,
  { state: RootState; rejectValue: string }
>(
  'books/fetchMoreBooks',
  async (_, { getState, rejectWithValue }) => {

    const state = getState().googleBooks;
    const { currentQuery, volumes } = state;

    const startIndex = volumes.length;

    try {
      const response: AxiosResponse = await axios.get(BOOKS_API_URL, {
        params: {
          q: currentQuery,
          startIndex: startIndex,
          maxResults: 40
        }
      });

      return response.data.items as BookItem[] || [];

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data?.error?.message;
        return rejectWithValue(apiError || 'Unable to contact API.');
      }
      return rejectWithValue('Unexpected error.');
    }
  }
);

const googleBooksSlice = createSlice({
  name: 'googleBooks',
  initialState,
  reducers: {
    clearGoogleBooksSearch: (state) => {
      state.volumes = [];
      state.status = 'idle';
      state.error = null;
      state.currentQuery = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGoogleBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGoogleBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.volumes = action.payload;
        state.currentQuery = action.meta.arg
      })
      .addCase(fetchGoogleBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; 
      })
      .addCase(fetchMoreGoogleBooks.pending, (state) => {
        state.status = 'loading-more';
        state.error = null;
      })
      .addCase(fetchMoreGoogleBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.volumes = state.volumes.concat(action.payload); 
      })
      .addCase(fetchMoreGoogleBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; 
      });
  },
});

export const { clearGoogleBooksSearch } = googleBooksSlice.actions;
export default googleBooksSlice.reducer;



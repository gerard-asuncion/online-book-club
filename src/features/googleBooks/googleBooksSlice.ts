import * as Sentry from '@sentry/react';
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
  'googleBooks/fetchBooks',
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
      Sentry.captureException(error);
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
  'googleBooks/fetchMoreBooks',
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
      Sentry.captureException(error);
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data?.error?.message;
        return rejectWithValue(apiError || 'Unable to contact API.');
      }
      return rejectWithValue('Unexpected error.');
    }
  }
);

export const fetchBooksByIds = createAsyncThunk<
  BookItem[], 
  string[],
  { rejectValue: string }
>(
  'googleBooks/fetchBooksByIds',
  async (allRoomIds: string[], { rejectWithValue }) => { 
    const validRoomIds = allRoomIds.filter(Boolean);
    if (validRoomIds.length === 0) return [];

    try {
      const fetchPromises: Promise<AxiosResponse>[] = validRoomIds.map(roomId =>
        axios.get(`${BOOKS_API_URL}/${roomId}`)
      );
      const responses: AxiosResponse[] = await Promise.all(fetchPromises);
      
      const activeBooksData: BookItem[] = responses.map(response => response.data as BookItem);

      return activeBooksData;

    } catch (error) { 
      Sentry.captureException(error);
      if (axios.isAxiosError(error)) {
        console.error('Failed to fetch one or more active book rooms.');
        return rejectWithValue('Failed to fetch one or more active book rooms.');
      } else {
        console.error('An unexpected error occurred:', error);
        return rejectWithValue('An unexpected error occurred.');
      }
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
        state.volumes = action.payload as BookItem[];
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
      })
      .addCase(fetchBooksByIds.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooksByIds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.volumes = action.payload as BookItem[] 
      })
      .addCase(fetchBooksByIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; 
      });
  },
});

export const { clearGoogleBooksSearch } = googleBooksSlice.actions;
export default googleBooksSlice.reducer;



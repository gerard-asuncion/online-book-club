import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { BooksSliceInitialState } from '../../types/redux';

const BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

const initialState: BooksSliceInitialState = {
  volumes: [],
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (searchQuery) => {
    const response = await axios.get(BOOKS_API_URL, {
      params: {
        q: searchQuery,
      },
    });

    return response.data.items || [];
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBookSearch: (state) => {
      state.volumes = [];
      state.status = 'idle';
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.volumes = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "unknown error";
      });
  },
});

export const { clearBookSearch } = booksSlice.actions;
export default booksSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { BooksSliceInitialState } from '../../types/redux';
import type { BookItem } from '../../types/books';

const BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

const initialState: BooksSliceInitialState = {
  volumes:[],
  status: 'idle', 
  error: null,
};

export const fetchBooks = createAsyncThunk<
  BookItem[],
  string,
  { rejectValue: string }
>(
  'books/fetchBooks',
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(BOOKS_API_URL, {
        params: { q: searchQuery },
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
        state.error = action.payload as string; 
      });
  },
});

export const { clearBookSearch } = booksSlice.actions;
export default booksSlice.reducer;



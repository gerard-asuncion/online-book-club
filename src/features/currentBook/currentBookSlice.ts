import { createSlice } from "@reduxjs/toolkit";
import type { CurrentBookInitialState } from "../../types/redux";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CurrentBookInitialState = {
    bookId: null,
    bookTitle: null,
    bookAuthors: []
}

const currentBookSlice = createSlice({
  name: 'currentBook',
  initialState,
  
  reducers: {
    setCurrentBook: (state, action: PayloadAction<{ bookId: string, title: string, authors: string[] }>) => {
      state.bookId = action.payload.bookId;
      state.bookTitle = action.payload.title;
      state.bookAuthors = action.payload.authors;
    },
    clearCurrentBook: (state) =>{
      state.bookId = null;
      state.bookTitle = null;
      state.bookAuthors = [];
    },
  },
});

export const { setCurrentBook, clearCurrentBook } = currentBookSlice.actions;
export default currentBookSlice.reducer;


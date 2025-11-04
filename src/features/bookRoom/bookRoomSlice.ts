import { createSlice } from "@reduxjs/toolkit";
import type { BookRoomInitialState } from "../../types/redux";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: BookRoomInitialState = {
    bookRoom: null,
    bookId: null,
    bookTitle: null,
    bookAuthors: null
}

const bookRoomSlice = createSlice({
  name: 'bookRoom',
  initialState,
  
  reducers: {
    setBookRoom: (state, action: PayloadAction<{ bookRoom: string }>) => {
      state.bookRoom = action.payload.bookRoom;
    },
    clearBookRoom: (state) => {
      state.bookRoom = null;
    },
    setBookId: (state, action: PayloadAction<{ bookId: string }>) => {
      state.bookId = action.payload.bookId;
    },
    setBookInfo: (state, action: PayloadAction<{ title: string, authors: string[] }>) => {
      state.bookTitle = action.payload.title;
      state.bookAuthors = action.payload.authors;
    },
    clearBookData: (state) =>{
      state.bookId = null;
      state.bookTitle = null;
      state.bookAuthors = null;
    },
  },
});

export const { setBookRoom, clearBookRoom, setBookId, setBookInfo, clearBookData } = bookRoomSlice.actions;
export default bookRoomSlice.reducer;


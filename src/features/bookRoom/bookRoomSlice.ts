import { createSlice } from "@reduxjs/toolkit";
import type { BookRoomInitialState } from "../../types/redux";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: BookRoomInitialState = {
    bookRoom: "",
}

const bookRoomSlice = createSlice({
  name: 'bookRoom',
  initialState,
  
  reducers: {
    setBookRoom: (state, action: PayloadAction<{ bookRoom: string }>) => {
      state.bookRoom = action.payload.bookRoom;
    },
    clearBookRoom: (state) => {
      state.bookRoom = "";
    }
  },
});

export const { setBookRoom, clearBookRoom } = bookRoomSlice.actions;
export default bookRoomSlice.reducer;
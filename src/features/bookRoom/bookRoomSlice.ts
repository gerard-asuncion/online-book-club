import { createSlice } from "@reduxjs/toolkit";
import type { BookRoomInitialState } from "../../types/redux";
import type { PayloadAction } from "@reduxjs/toolkit";
import { selectUnreadMessagesCount } from "./bookRoomSelectors";

const initialState: BookRoomInitialState = {
    bookRoom: "",
    lastViewedKey: "",
    lastViewedDate: 0,
    unreadMessagesCount: 0
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
    },
    setLastViewedKey: (state, action: PayloadAction<{ lastViewedKey: string }>) => {
      state.lastViewedKey = `lastViewed_${action.payload.lastViewedKey}`;
    },
    setLastViewedDate: (state, action: PayloadAction<{ key: string }>) => {
      state.lastViewedDate = new Date(action.payload.key).getTime();
    },
    setUnreadMessagesCount: (state, action: PayloadAction<{ totalUnreadMessages: number }>) => {
      state.unreadMessagesCount = action.payload.totalUnreadMessages;
    },
    clearUnreadMessagesCount: (state) => {
      state.unreadMessagesCount = 0;
    }
  },
});

export const { 
  setBookRoom, 
  clearBookRoom, 
  setLastViewedKey, 
  setLastViewedDate,
  setUnreadMessagesCount,
  clearUnreadMessagesCount
} = bookRoomSlice.actions;
export default bookRoomSlice.reducer;
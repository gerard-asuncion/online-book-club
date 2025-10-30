import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SidebarInitialState } from "../../types/redux";

const initialState: SidebarInitialState = {
    windowWidth: 0,
    openSidebar: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  
  reducers: {
    setOpen: (state) => {
        state.openSidebar = true;
    },
    setClose: (state) => {
        state.openSidebar = false;
    },
    setWindowWidth: (state, action: PayloadAction<{ windowWidth: number }>) => {
      state.windowWidth = action.payload.windowWidth;  
    }
  },
});

export const { setOpen, setClose, setWindowWidth } = sidebarSlice.actions;
export default sidebarSlice.reducer;
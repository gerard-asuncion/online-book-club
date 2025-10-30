import { createSlice } from "@reduxjs/toolkit";
import type { SidebarInitialState } from "../../types/redux";

const initialState: SidebarInitialState = {
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
    }
  },
});

export const { setOpen, setClose } = sidebarSlice.actions;
export default sidebarSlice.reducer;
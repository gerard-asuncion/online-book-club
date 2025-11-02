import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ResponsiveInitialState } from "../../types/redux";

const initialState: ResponsiveInitialState = {
    windowWidth: 0,
    isMobile: true,
    openSidebar: false,
}

const sidebarSlice = createSlice({
  name: 'responsive',
  initialState,
  
  reducers: {
    setWindowWidth: (state, action: PayloadAction<{ windowWidth: number }>) => {
      state.windowWidth = action.payload.windowWidth;  
    },
    setIsMobile: (state) => {
      state.isMobile = true;
    },
    setIsNotMobile: (state) => {
      state.isMobile = false;
    },
    setOpenSidebar: (state) => {
      state.openSidebar = true;
    },
    setCloseSidebar: (state) => {
      state.openSidebar = false;
    }
  },
});

export const { setWindowWidth, setIsMobile, setIsNotMobile, setOpenSidebar, setCloseSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import type { ResponsiveInitialState } from "../../types/redux";

export const mdBreakpoint: number = 768;
const getInitialMobileState = (): boolean => {
  return window.innerWidth < mdBreakpoint;
};

const initialState: ResponsiveInitialState = {
    isMobile: getInitialMobileState(),
    openSidebar: false,
}

const sidebarSlice = createSlice({
  name: 'responsive',
  initialState,
  
  reducers: {
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

export const { setIsMobile, setIsNotMobile, setOpenSidebar, setCloseSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
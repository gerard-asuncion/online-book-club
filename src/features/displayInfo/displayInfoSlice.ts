import { createSlice } from '@reduxjs/toolkit';
import type { DisplayInfoSliceInitialState } from '../../types/redux';

const initialState: DisplayInfoSliceInitialState = {
  displayInfo: true
};

const displayInfoSlice = createSlice({
  name: 'displayInfo',
  initialState,
  
  reducers: {
    activateDisplayInfo: (state) => {
      state.displayInfo = true;
    },
    hideDisplayInfo: (state) => {
      state.displayInfo = false;
    }
  },
});

export const { activateDisplayInfo, hideDisplayInfo } = displayInfoSlice.actions;
export default displayInfoSlice.reducer;
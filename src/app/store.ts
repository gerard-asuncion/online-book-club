import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import mainContentRouteReducer from '../features/mainContentRoute/mainContentRouteSlice';
import bookRoomReducer from '../features/bookRoom/bookRoomSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice'

const store = configureStore({
	reducer: {
		auth: authReducer, 
		mainContentRoute: mainContentRouteReducer,
		bookRoom: bookRoomReducer,
		sidebar: sidebarReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
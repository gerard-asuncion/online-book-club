import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/authSlice';
import mainContentRouteReducer from '../features/mainContentRoute/mainContentRouteSlice';
import bookRoomReducer from '../features/bookRoom/bookRoomSlice';
import responsiveReducer from '../features/responsive/responsiveSlice';
import booksReducer from '../features/books/booksSlice';

const rootReducer = combineReducers({
    auth: authReducer, 
    mainContentRoute: mainContentRouteReducer,
    bookRoom: bookRoomReducer,
    responsive: responsiveReducer,
    books: booksReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['mainContentRoute', 'bookRoom', 'responsive'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
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
import userProfileReducer from '../features/userProfile/userProfileSlice';
import mainContentRouteReducer from '../features/mainContentRoute/mainContentRouteSlice';
import currentBookReducer from '../features/currentBook/currentBookSlice';
import responsiveReducer from '../features/responsive/responsiveSlice';
import googleBooksReducer from '../features/books/googleBooksSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer,
    mainContentRoute: mainContentRouteReducer,
    currentBook: currentBookReducer,
    responsive: responsiveReducer,
    googleBooks: googleBooksReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userProfile', 'mainContentRoute', 'currentBook', 'responsive', 'storedBooks'] 
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
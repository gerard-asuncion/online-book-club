import { configureStore, combineReducers } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";
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
import currentBookReducer from '../features/currentBook/currentBookSlice';
import responsiveReducer from '../features/responsive/responsiveSlice';
import googleBooksReducer from '../features/googleBooks/googleBooksSlice';
import displayInfoReducer from '../features/displayInfo/displayInfoSlice';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
});

const rootReducer = combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer,
    currentBook: currentBookReducer,
    responsive: responsiveReducer,
    googleBooks: googleBooksReducer,
    displayInfo: displayInfoReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [ 'userProfile', 'currentBook', 'responsive', 'displayInfo' ] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
    enhancers: (getDefaultEnhancers) => {
        return getDefaultEnhancers().concat(sentryReduxEnhancer);
    },
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
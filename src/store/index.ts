import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {persistStore, persistReducer} from 'redux-persist';

import UserSlice from './user';

import themeSlice from './theme';

import BlogSlice from './blog';
import ChatSlice from './chat';

const rootReducer = combineReducers({
  user: UserSlice,
  theme: themeSlice,
  blogs: BlogSlice,
  chat: ChatSlice,
});

const persistConfig = {
  key: 'routine',
  storage: AsyncStorage,
  whiteList: ['user', 'blog' ,"chat"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

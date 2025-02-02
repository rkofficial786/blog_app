import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {persistStore, persistReducer} from 'redux-persist';

import LoadSlice from './loading';
import UserSlice from './user';
import OtherSlice from './others';
import themeSlice from './theme';
import taskSlice from './task';
import categorySlice from './category';
import BlogSlice  from './blog';

const rootReducer = combineReducers({
  load: LoadSlice,
  user: UserSlice,
  other: OtherSlice,
  theme: themeSlice,
  task: taskSlice,
  category: categorySlice,
  blogs:BlogSlice
});

const persistConfig = {
  key: 'routine',
  storage: AsyncStorage,
  whiteList: ['user','blog'],
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

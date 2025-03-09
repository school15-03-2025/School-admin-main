// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import exampleReducer from '../features/exampleSlice';

const rootReducer = combineReducers({
  example: exampleReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

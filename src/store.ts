// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./redux/FavoritesReducer";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./redux/FavoritesReducer";
import profileReducer from "./redux/ProfileReducer";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

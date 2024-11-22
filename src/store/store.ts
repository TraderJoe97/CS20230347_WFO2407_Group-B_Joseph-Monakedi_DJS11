import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import favouritesReducer from "./FavouritesSlice";
import { loadStateFromLocalStorage } from "@/app/browser-storage";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  player: playerReducer,
  favourites: favouritesReducer,
});

// Define RootState based on the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadStateFromLocalStorage() as Partial<RootState> | undefined, // Load state from browser storage on app start
});

// Define AppDispatch based on the store
export type AppDispatch = typeof store.dispatch;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import favouritesReducer from "./FavouritesSlice";
import { loadStateFromLocalStorage } from "@/app/browser-storage";

const rootReducer = combineReducers({
    player: playerReducer,
    favourites: favouritesReducer
});

export const store: ReturnType<typeof configureStore> = configureStore({
    reducer: rootReducer,
    preloadedState: loadStateFromLocalStorage() as Partial<RootState> | undefined, // Load state from browser storage on app start
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
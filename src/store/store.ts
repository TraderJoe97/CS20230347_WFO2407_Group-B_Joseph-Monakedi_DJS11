import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import favouritesReducer from "./FavouritesSlice";

const rootReducer = combineReducers({
    player: playerReducer,
    favourites: favouritesReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
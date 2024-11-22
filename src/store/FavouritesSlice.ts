import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavouriteEpisode {
  id: number;
  showId: number;
  seasonId: number;
}


interface FavouritesState {
  episodes: FavouriteEpisode[];
}

const initialState: FavouritesState = {
  episodes: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<FavouriteEpisode>) => {
      state.episodes.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<FavouriteEpisode>) => {
      state.episodes = state.episodes.filter(
        (episode) =>
          episode.id !== action.payload.id &&
          episode.showId !== action.payload.showId &&
          episode.seasonId !== action.payload.seasonId
      );
    },
    ClearAllFavourates: (state) => {
      state.episodes = [];
    },
  },
});

export const { addFavourite, removeFavourite, ClearAllFavourates } =
  favouritesSlice.actions;
export const favourites = (state: { favourites: FavouritesState }) =>
  state.favourites;

export default favouritesSlice.reducer;

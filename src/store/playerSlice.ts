import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  currentEpisode: CurrentEpisode | null;
  isPlaying: boolean;
  currentTime: number;
}

interface CurrentEpisode {
  id: number;
  title: string;
  file: string;
  showId: number;
  showTitle: string;
  seasonId: number;
  seasonImage: string;
}

const initialState: PlayerState = {
  currentEpisode: null,
  isPlaying: false,
  currentTime: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentEpisode: (state, action: PayloadAction<CurrentEpisode>) => {
      state.currentEpisode = {
        id: action.payload.id,
        title: action.payload.title,
        file: action.payload.file,
        showId: action.payload.showId,
        showTitle: action.payload.showTitle,
        seasonId: action.payload.seasonId,
        seasonImage: action.payload.seasonImage,
      };
      state.isPlaying = true;
    },
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    resetPlayer: (state) => {
      state.currentEpisode = null;
      state.isPlaying = false;
      state.currentTime = 0;
    },
  },
});

export const { setCurrentEpisode, togglePlaying, setCurrentTime, resetPlayer } =
  playerSlice.actions;
export default playerSlice.reducer;

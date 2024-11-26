import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EpisodeProgress {
  episodeId: number;
  showId: number;
  seasonId: number;
  episodeProgress: number;
  episodeDuration: number;
}

interface progressState {
  episodesProgress: EpisodeProgress[];
}

const initialState: progressState = {
  episodesProgress: [],
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    addEpisodeProgress: (state, action: PayloadAction<EpisodeProgress>) => {
      state.episodesProgress.push(action.payload);
    },
    updateEpisodeProgress: (state, action: PayloadAction<EpisodeProgress>) => {
      const index = state.episodesProgress.findIndex(
        (progress) =>
          progress.episodeId === action.payload.episodeId &&
          progress.showId === action.payload.showId &&
          progress.seasonId === action.payload.seasonId
      );
      if (index !== -1) {
        state.episodesProgress[index] = action.payload;
      }
    },
    clearAllEpisodesProgress: (
      state,
      action: PayloadAction<EpisodeProgress>
    ) => {
      state.episodesProgress = state.episodesProgress.filter(
        (progress) =>
          progress.episodeId !== action.payload.episodeId &&
          progress.showId !== action.payload.showId &&
          progress.seasonId !== action.payload.seasonId
      );
    },
  },
});

export const {
  addEpisodeProgress,
  updateEpisodeProgress,
  clearAllEpisodesProgress,
} = progressSlice.actions;
export default progressSlice.reducer;
export const progress = (state: { progress: progressState }) => state.progress;

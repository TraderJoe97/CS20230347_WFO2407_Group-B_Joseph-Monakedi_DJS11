import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerState {
    currentEpisode: {
        id: number
        title: string
        image: string
        file: string
    } | null;
    isPlaying: boolean;
    currentTime: number
}

const initialState: PlayerState = {
    currentEpisode: null,
    isPlaying: false,
    currentTime: 0,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentEpisode: (state, action: PayloadAction<{ id: number; title: string; image: string; file: string }>) => {
            state.currentEpisode = {
                id: action.payload.id,
                title: action.payload.title,
                image: action.payload.image,
                file: action.payload.file,
            };
        },
        togglePlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
    },
});

export const { setCurrentEpisode, togglePlaying, setCurrentTime } = playerSlice.actions;
export default playerSlice.reducer;
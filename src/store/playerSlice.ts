import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerState {
    currentEpisode: {
        id: number
        title: string
        file: string
    } | null;
    isPlaying: boolean;
    currentTime: number
}

interface episode {
    id: number;
    title: string
    file: string;
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
        setCurrentEpisode: (state, action: PayloadAction<episode>) => {
            state.currentEpisode = {
                id: action.payload.id,
                title: action.payload.title,
                file: action.payload.file,
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
            state.currentTime = 0;}
    },
});

export const { setCurrentEpisode, togglePlaying, setCurrentTime, resetPlayer } = playerSlice.actions;
export default playerSlice.reducer;
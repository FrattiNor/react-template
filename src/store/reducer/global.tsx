import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'global',
    initialState: {
        title: '-',
    },
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
    },
});

export const { setTitle } = slice.actions;

export default slice.reducer;

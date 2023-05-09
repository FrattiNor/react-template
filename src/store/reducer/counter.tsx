import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

const slice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

export const actions = slice.actions;

export default slice.reducer;

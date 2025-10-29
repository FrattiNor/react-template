import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
	V_ScrollBarWidth: number;
}

// Define the initial state using that type
const initialState: CounterState = {
	V_ScrollBarWidth: 0,
};

export const counterSlice = createSlice({
	name: 'tableState',
	initialState,
	reducers: {
		setV_ScrollBarWidth: (state, action: PayloadAction<number>) => {
			state.V_ScrollBarWidth = action.payload;
		},
	},
});

export const { setV_ScrollBarWidth } = counterSlice.actions;

export default counterSlice.reducer;

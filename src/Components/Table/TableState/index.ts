import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from './counterSlice';
import counter2Slice from './counter2Slice';

export const getStore = () =>
	configureStore({
		reducer: {
			counter: counterSlice,
			counter2: counter2Slice,
		},
	});

export type Store = ReturnType<typeof getStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<Store['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Store['dispatch'];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

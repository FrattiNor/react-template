import { useSelector as useSelectorOrigin, useDispatch as useDispatchOrigin } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counter from './reducer/counter';

const store = configureStore({
    reducer: {
        counter,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export function useSelector<T>(fn: (v: RootState) => T) {
    return useSelectorOrigin(fn);
}

export function useDispatch(): AppDispatch {
    return useDispatchOrigin();
}

export default store;

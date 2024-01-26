/* eslint-disable react-refresh/only-export-components */
import { FC, PropsWithChildren, useReducer, useRef } from 'react';
import QueryContext from './QueryContext';

export const useQueryProvider = () => {
    const rerender = useReducer(() => ({}), {})[1];
    const queryDataRef = useRef<Record<string, any>>({});
    const queryLoadingRef = useRef<Record<string, boolean>>({});

    const queryData = queryDataRef.current;
    const setQueryData = (data: Record<string, any>) => {
        queryDataRef.current = { ...queryDataRef.current, ...data };
    };

    const queryLoading = queryLoadingRef.current;
    const setQueryLoading = (data: Record<string, boolean>) => {
        queryLoadingRef.current = { ...queryLoadingRef.current, ...data };
    };

    return { queryData, setQueryData, queryLoading, setQueryLoading, rerender };
};

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return <QueryContext.Provider value={useQueryProvider()}>{children}</QueryContext.Provider>;
};

export default QueryProvider;

/* eslint-disable react-refresh/only-export-components */
import { FC, PropsWithChildren, useReducer, useRef } from 'react';
import QueryContext from './QueryContext';

export const useQueryProvider = () => {
    const rerender = useReducer(() => ({}), {})[1];
    const queryDataRef = useRef<Record<string, any>>({});
    const queryLoadingRef = useRef<Record<string, boolean>>({});

    return { rerender, queryDataRef, queryLoadingRef };
};

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return <QueryContext.Provider value={useQueryProvider()}>{children}</QueryContext.Provider>;
};

export default QueryProvider;

/* eslint-disable react-refresh/only-export-components */
import { FC, PropsWithChildren, useReducer, useRef } from 'react';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

import QueryContext from './QueryContext';

type Props = {
    beforeRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    afterRequest?: (response: Promise<AxiosResponse<any>>) => Promise<AxiosResponse<any>>;
};

export const useQueryProvider = (props: Props) => {
    const rerender = useReducer(() => ({}), {})[1];
    const queryDataRef = useRef<Record<string, any>>({});
    const queryLoadingRef = useRef<Record<string, boolean>>({});
    return { rerender, queryDataRef, queryLoadingRef, ...props };
};

const QueryProvider: FC<PropsWithChildren & Props> = ({ children, ...props }) => {
    return <QueryContext.Provider value={useQueryProvider(props)}>{children}</QueryContext.Provider>;
};

export default QueryProvider;

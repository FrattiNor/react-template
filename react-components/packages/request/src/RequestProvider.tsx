/* eslint-disable react-refresh/only-export-components */
import { FC, PropsWithChildren } from 'react';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

import RequestContext from './RequestContext';

type Props = {
    beforeRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    handleSuccess?: (response: AxiosResponse<any>) => any;
    handleError?: (response: AxiosResponse<any>) => any;
};

export const useRequestProvider = (props: Props) => {
    return { ...props };
};

const RequestProvider: FC<PropsWithChildren & Props> = ({ children, ...props }) => {
    return <RequestContext.Provider value={useRequestProvider(props)}>{children}</RequestContext.Provider>;
};

export default RequestProvider;

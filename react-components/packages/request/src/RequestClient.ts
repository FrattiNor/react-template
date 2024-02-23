import { isFormData, isObject, cleanRecord } from '@react/utils';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

type BeforeRequest = (config: AxiosRequestConfig) => AxiosRequestConfig;

type HandleResponse = (response: AxiosResponse<any>) => any;

type Props = {
    beforeRequest?: BeforeRequest;
    handleSuccess?: HandleResponse;
    handleError?: HandleResponse;
};

class RequestClient {
    constructor(props?: Props) {
        this.beforeRequest = props?.beforeRequest;
        this.handleSuccess = props?.handleSuccess;
        this.handleError = props?.handleError;
        this.cancelSource = axios.CancelToken.source();
        this.axiosClient = axios.create({
            cancelToken: this.cancelSource.token,
        });
    }

    private axiosClient: AxiosInstance;
    private cancelSource: CancelTokenSource;
    private beforeRequest?: BeforeRequest;
    private handleSuccess?: HandleResponse;
    private handleError?: HandleResponse;

    private request<T>(config: AxiosRequestConfig) {
        if (isObject(config.params)) config.params = cleanRecord(config.params);
        if (isObject(config.data) || isFormData(config.data)) config.data = cleanRecord(config.data);
        return this.axiosClient<T>(this.beforeRequest ? this.beforeRequest(config) : config).then(this.handleSuccess, this.handleError);
    }

    cancel() {
        this.cancelSource.cancel();
    }

    GET<T>(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request<T>({
            method: 'GET',
            ...config,
        });
    }

    PUT<T>(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request<T>({
            method: 'PUT',
            ...config,
        });
    }

    POST<T>(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request<T>({
            method: 'POST',
            ...config,
        });
    }

    PATCH<T>(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request<T>({
            method: 'PATCH',
            ...config,
        });
    }

    DELETE<T>(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request<T>({
            method: 'DELETE',
            ...config,
        });
    }
}

export default RequestClient;

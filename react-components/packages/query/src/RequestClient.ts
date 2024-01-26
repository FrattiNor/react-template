import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { isFormData, isObject, cleanRecord } from '@react/utils';

class RequestClient {
    constructor() {
        this.cancelSource = axios.CancelToken.source();
        this.axiosClient = axios.create({
            cancelToken: this.cancelSource.token,
        });
    }

    private axiosClient: AxiosInstance;
    private cancelSource: CancelTokenSource;

    private request<T>(config: AxiosRequestConfig) {
        if (isObject(config.params)) config.params = cleanRecord(config.params);
        if (isObject(config.data) || isFormData(config.data)) config.data = cleanRecord(config.data);
        return this.axiosClient<T>(config);
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

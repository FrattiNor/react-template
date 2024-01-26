import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { isFormData, isObject } from '@react/utils/valueType';
import cleanRecord from '@react/utils/cleanRecord';

class RequestClient {
    constructor() {
        this.cancelSource = axios.CancelToken.source();
        this.axiosClient = axios.create({
            cancelToken: this.cancelSource.token,
        });
    }

    axiosClient: AxiosInstance;
    cancelSource: CancelTokenSource;

    private request(config: AxiosRequestConfig) {
        if (isObject(config.params)) config.params = cleanRecord(config.params);
        if (isObject(config.data) || isFormData(config.data)) config.data = cleanRecord(config.data);
        return this.axiosClient(config);
    }

    GET(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request({
            method: 'GET',
            ...config,
        });
    }

    PUT(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request({
            method: 'PUT',
            ...config,
        });
    }

    POST(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request({
            method: 'POST',
            ...config,
        });
    }

    PATCH(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request({
            method: 'PATCH',
            ...config,
        });
    }

    DELETE(config: Omit<AxiosRequestConfig, 'method'>) {
        return this.request({
            method: 'DELETE',
            ...config,
        });
    }
}

export default RequestClient;

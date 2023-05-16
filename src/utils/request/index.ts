import Toast from '@/components/Toast';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import contentDisposition from 'content-disposition';

// == Response
type ResponseData<T> = {
    code: number;
    msg: string;
    result: {
        data: T;
        lastOperaTime: string;
    };
};

type ReturnData<T> = ResponseData<T> | Blob;
// == Response

// == Result
type BlobRes = {
    blob: Blob;
    filename: string;
};

type Res<T> = T extends Blob ? BlobRes | null : T | null;
// == Result

class RequestClient {
    private axiosClient = axios.create();

    private methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'] as const;

    private handleBlob = (data: Blob, headers: AxiosResponse['headers']): BlobRes => {
        const contentDispositionStr = headers['content-disposition'];
        const { parameters = {} } = contentDispositionStr ? contentDisposition.parse(contentDispositionStr) : {};
        const { filename = '' } = parameters || {};
        return { blob: data, filename };
    };

    private handleJson = <T>(data: ResponseData<T>): T | null => {
        const { code, msg, result } = data as ResponseData<T>;
        switch (code) {
            case 0:
                return result.data;
            default:
                if (typeof msg === 'string' && msg !== '') {
                    Toast.fail(msg);
                }
                return null;
        }
    };

    private handleResponse = <T>(req: AxiosResponse<ReturnData<T>, any>): Res<T> => {
        const { data, headers } = req;
        switch (Object.prototype.toString.call(data)) {
            case '[object Object]':
                return this.handleJson(data as ResponseData<T>) as Res<T>;
            case '[object Blob]': {
                return this.handleBlob(data as Blob, headers) as Res<T>;
            }
            default:
                return null as Res<T>;
        }
    };

    private handleError = (e: any): Res<any> => {
        const { msg, message, error } = e?.response?.data || {};
        Toast.fail('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' || msg || message || error || '接口错误');
        return null as Res<any>;
    };

    get request() {
        type Method = (typeof this.methods)[number];
        type Request = <T>(config: Omit<AxiosRequestConfig, 'method'>) => Promise<Res<T>>;
        type Map = Record<Method, Request>;
        const map: Map = {} as Map;
        this.methods.forEach((method) => {
            map[method] = <T>(config: Omit<AxiosRequestConfig, 'method'>) =>
                this.axiosClient<ReturnData<T>>({ method, ...config }).then(this.handleResponse, this.handleError);
        });
        return map;
    }
}

const client = new RequestClient();

export default client.request;

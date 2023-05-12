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

    private methods = {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    };

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
                console.log(msg);
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

    get request() {
        type Method = keyof typeof this.methods;
        type Request = <T>(config: Omit<AxiosRequestConfig, 'method'>) => Promise<Res<T>>;
        type Map = Record<Method, Request>;
        const map: Map = {} as Map;
        Object.entries(this.methods).forEach(([k, v]) => {
            map[k as Method] = <T>(config: Omit<AxiosRequestConfig, 'method'>) =>
                this.axiosClient<ReturnData<T>>({ method: v, ...config }).then(this.handleResponse);
        });
        return map;
    }
}

const client = new RequestClient();

export default client.request;

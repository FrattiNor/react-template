import { HttpsProxyAgent, HttpProxyAgent } from 'hpagent';
import got, { Got } from 'got';

// 将 obj 转为 formData
export const transformObjToFormData = (obj: Record<string, any>, type: 'FormData' | 'URLSearchParams') => {
    const newFormData = type === 'FormData' ? new FormData() : new URLSearchParams();
    Object.entries(obj).forEach(([k, v]) => {
        if (Array.isArray(v)) {
            v.forEach((item) => newFormData.append(k, item));
        } else {
            newFormData.append(k, v);
        }
    });
    return newFormData;
};

class GotInstanceClass {
    instance: Got | null = null;

    getInstance() {
        if (this.instance === null) {
            const httpsAgent = new HttpsProxyAgent({
                proxy: 'http://localhost:8080',
                rejectUnauthorized: false,
            });

            const httpAgent = new HttpProxyAgent({
                proxy: 'http://localhost:8080',
            });

            this.instance = got.extend({
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                },
                agent: {
                    https: httpsAgent,
                    http: httpAgent,
                },
                methodRewriting: true,
            });
        }
        return this.instance;
    }
}

export const gotInstance = new GotInstanceClass();

export const getCookie = (key: string, cookieArr?: Array<string>) => {
    let res = undefined;
    if (Array.isArray(cookieArr) && cookieArr.length > 0) {
        cookieArr.forEach((item) => {
            const reg = new RegExp(`${key}=(.*?);`);
            const nextRes = reg.exec(item)?.[1];
            if (typeof nextRes === 'string' && nextRes !== '') {
                res = nextRes;
            }
        });
    }
    return res as string | undefined;
};

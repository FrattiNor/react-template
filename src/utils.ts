import { HttpsProxyAgent, HttpProxyAgent } from 'hpagent';
import FormData from 'form-data';
import process from 'process';
import got from 'got';

const isDev = process.env.NODE_ENV === 'development';

const httpsAgent = new HttpsProxyAgent({
    proxy: 'http://localhost:8080',
    rejectUnauthorized: false,
});

const httpAgent = new HttpProxyAgent({
    proxy: 'http://localhost:8080',
});

export const gotInstance = got.extend({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    },
    agent: {
        https: isDev ? httpsAgent : undefined,
        http: isDev ? httpAgent : undefined,
    },
    methodRewriting: true,
    followRedirect: false,
});

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

// 将 obj 转为 formData
export const transformObjToFormData = (obj: Record<string, any>) => {
    const newFormData = new FormData();
    Object.entries(obj).forEach(([k, v]) => {
        if (Array.isArray(v)) {
            v.forEach((item) => newFormData.append(k, item));
        } else {
            newFormData.append(k, v);
        }
    });
    return newFormData;
};

import { HttpsProxyAgent, HttpProxyAgent } from 'hpagent';
import FormData from 'form-data';
import process from 'process';
import chalk from 'chalk';
import dayjs from 'dayjs';
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

export const colorMap = {
    red: chalk.rgb(219, 106, 106),
    blue: chalk.rgb(22, 119, 255),
    green: chalk.rgb(82, 196, 26),
    yellow: chalk.rgb(229, 229, 16),
    purple: chalk.rgb(146, 84, 222),
    magenta: chalk.rgb(235, 47, 150),
} as const;

export const getRecord = (handle: string) => {
    let timestamp = 0;

    const start = () => {
        timestamp = dayjs().valueOf();
        console.log(colorMap.blue(`${handle}中...`));
    };
    const end = () => {
        console.log(colorMap.green(`${handle}完成`));
        console.log(colorMap.yellow(`耗时: ${(dayjs().valueOf() - timestamp) / 1000}s\n`));
    };

    return { start, end };
};

export const getTotalRecord = () => {
    let timestamp = 0;

    const start = () => {
        timestamp = dayjs().valueOf();
    };
    const end = () => {
        console.log(colorMap.yellow(`总耗时: ${(dayjs().valueOf() - timestamp) / 1000}s`));
    };

    return { start, end };
};

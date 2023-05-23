import { isEmpty } from './tools';
import dayjs from 'dayjs';

// 清除空数组，undefined，null，空字符串，空对象
export const cleanParams = (_v: Record<string, any>): Record<string, any> => {
    const nextParams: Record<string, any> = {};

    Object.entries(_v).forEach(([k, v]) => {
        if (!isEmpty(v)) {
            nextParams[k] = v;
        }
    });

    return nextParams;
};

// 将参数的数组转为字符串，逗号分隔
export const paramsArrayToStr = (v: Record<string, any>, keys: string[]): Record<string, any> => {
    const nextParams: Record<string, any> = { ...v };

    keys.forEach((key) => {
        const value = nextParams[key];
        if (Array.isArray(value) && value.length > 0) {
            nextParams[key] = v.join(',');
        }
    });

    return nextParams;
};

export const paramsDateFormat = (v: Record<string, any>, keys: Record<string, string>): Record<string, any> => {
    const nextParams: Record<string, any> = { ...v };

    Object.entries(keys).forEach(([key, format]) => {
        const value = nextParams[key];
        if (value instanceof Date) {
            if (format === 'num') {
                nextParams[key] = dayjs(value).valueOf();
            } else {
                nextParams[key] = dayjs(value).format(format);
            }
        }
    });

    return nextParams;
};

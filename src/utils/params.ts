import { isEmpty } from './tools';
import dayjs from 'dayjs';

// 清除空数组，undefined，null，空字符串，空对象
export const cleanParams = (params: Record<string, any>): Record<string, any> => {
    const nextParams: Record<string, any> = {};

    Object.entries(params).forEach(([k, v]) => {
        if (!isEmpty(v)) {
            nextParams[k] = v;
        }
    });

    return nextParams;
};

// 将参数的数组转为字符串，逗号分隔
export const paramsArrayToStr = (params: Record<string, any>, keys: string[]): Record<string, any> => {
    const nextParams: Record<string, any> = { ...params };

    keys.forEach((key) => {
        const value = nextParams[key];
        if (Array.isArray(value) && value.length > 0) {
            nextParams[key] = value.join(',');
        }
    });

    return nextParams;
};

// 将时间格式化为string或者时间戳
export const paramsDateFormat = (params: Record<string, any>, keys: Record<string, string>): Record<string, any> => {
    const nextParams: Record<string, any> = { ...params };

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

// 将数组取最后一位【工厂模型特供】
export const paramsArrayToLast = (params: Record<string, any>, keys: string[]): Record<string, any> => {
    const nextParams: Record<string, any> = { ...params };

    keys.forEach((key) => {
        const value = nextParams[key];
        if (Array.isArray(value) && value.length > 0) {
            nextParams[key] = value[value.length - 1];
        }
    });

    return nextParams;
};

// 总的处理参数的方法
export const handleParams = (
    params: Record<string, any>,
    option: { clean?: boolean; arrayToString?: string[]; arrayToLast?: string[]; formatTime?: Record<string, string> },
) => {
    const { clean, arrayToString, arrayToLast, formatTime } = option;
    const paramsCopy = { ...params };
    const handledParams1 = clean ? cleanParams(paramsCopy) : paramsCopy;
    const handledParams2 = arrayToString ? paramsArrayToStr(handledParams1, arrayToString) : handledParams1;
    const handledParams3 = formatTime ? paramsDateFormat(handledParams2, formatTime) : handledParams2;
    const handledParams4 = arrayToLast ? paramsArrayToLast(handledParams3, arrayToLast) : handledParams3;
    return handledParams4;
};

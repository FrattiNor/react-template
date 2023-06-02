import { useEffect, useState } from 'react';

const handleDate = (v: any) => {
    if (v instanceof Date) {
        return `time_${v.valueOf()}`;
    }
    return v;
};

const unHandleDate = (v?: string) => {
    if (/^time_\d+$/.test(v || '')) {
        const time = v?.replace('time_', '');
        return new Date(Number(time as string));
    }
    return v;
};

const handleRecord = (params: Record<string, any>) => {
    const nextParams: Record<string, any> = {};
    Object.entries(params).forEach(([k, v]) => {
        nextParams[k] = handleDate(v);
    });
    return JSON.stringify(nextParams);
};

const unHandleRecord = (params?: string) => {
    try {
        if (params) {
            const parseParams = JSON.parse(params);
            const nextParams: Record<string, any> = {};
            Object.entries(parseParams).forEach(([k, v]) => {
                nextParams[k] = unHandleDate(v as string);
            });
            return nextParams;
        }
        return null;
    } catch (e) {
        return null;
    }
};

export const useLocalStorageRecord = <T extends Record<string, any>>(localKey: string, defaultValue: T) => {
    const [value, setValue] = useState<T>((unHandleRecord(localStorage.getItem(localKey) as any) as T) || defaultValue);

    useEffect(() => {
        localStorage.setItem(localKey, handleRecord(value));
    }, [value]);

    return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export const isEmptyParam = (v: any) => {
    if (
        v === '' ||
        v === null ||
        v === undefined ||
        (Array.isArray(v) && v.length === 0) ||
        (Object.prototype.toString.call(v) === '[object Object]' && Object.keys(v).length === 0)
    ) {
        return true;
    }
    return false;
};

// 清除空数组，undefined，null，空字符串，空对象
export const cleanParams = (_v: Record<string, any>): Record<string, any> => {
    const nextParams: Record<string, any> = {};

    Object.entries(_v).forEach(([k, v]) => {
        if (!isEmptyParam(v)) {
            nextParams[k] = v;
        }
    });

    return nextParams;
};

// 将参数的数组转为字符串，逗号分隔
export const paramsArrayToStr = (_v: Record<string, any>, keys: string[]): Record<string, any> => {
    const newParams = cleanParams(_v);
    const nextParams: Record<string, any> = {};

    Object.entries(newParams).forEach(([k, v]) => {
        if (keys.includes(k) && Array.isArray(v) && v.length > 0) {
            nextParams[k] = v.join(',');
        } else {
            nextParams[k] = v;
        }
    });

    return nextParams;
};

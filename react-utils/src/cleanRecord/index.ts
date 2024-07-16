import { isEmpty } from '../empty';
import { isFormData, isNull, isNumber, isObject, isUndefined } from '../valueType';

const simpleCleanFun = (v: any) => {
    if (isNull(v) || isUndefined(v) || (isNumber(v) && isNaN(v))) {
        return true;
    }
    return false;
};

// 清除空数组，undefined，null，空字符串，空对象
const cleanRecord = <T extends Record<string, any> | FormData>(params: T, cleanFun?: 'simple' | ((v: any) => boolean)): T => {
    const needClean = cleanFun === 'simple' ? simpleCleanFun : typeof cleanFun === 'function' ? cleanFun : isEmpty;

    if (isFormData(params)) {
        const nextParams = new FormData();

        for (const [key, value] of params) {
            if (!needClean(value)) {
                nextParams.append(key, value);
            }
        }

        return nextParams as T;
    }

    if (isObject(params)) {
        const nextParams: Record<string, any> = {};

        Object.entries(params).forEach(([key, value]) => {
            if (!needClean(value)) {
                nextParams[key] = value;
            }
        });

        return nextParams as T;
    }

    return params;
};

export default cleanRecord;

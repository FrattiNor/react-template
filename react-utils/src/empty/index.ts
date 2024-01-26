import { isArr, isNull, isNumber, isObject, isString, isUndefined } from '../valueType';

// 判断是否为空
export const isEmpty = (v: any) => {
    if (
        isNull(v) ||
        isUndefined(v) ||
        (isString(v) && v === '') ||
        (isNumber(v) && isNaN(v)) ||
        (isArr(v) && v.length === 0) ||
        (isObject(v) && Object.keys(v).length === 0)
    ) {
        return true;
    }
    return false;
};

export const notEmpty = <T>(t: T, res?: () => any): any => {
    if (isEmpty(t)) {
        return '-';
    } else if (typeof res === 'function') {
        return notEmpty(res());
    } else {
        return t;
    }
};

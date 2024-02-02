import { isArr, isNull, isNumber, isObject, isString, isUndefined } from '../valueType';

// 判断是否为空
export const isEmpty = <T>(v: T) => {
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

export function notEmpty<T>(t: T): NonNullable<T> | string;
export function notEmpty<T, D>(t: T, res: (t: NonNullable<T>) => D): NonNullable<D> | string;
export function notEmpty<T, D>(t: T, res?: (t: NonNullable<T>) => D) {
    if (isEmpty(t)) {
        return '-';
    } else if (typeof res === 'function') {
        return notEmpty(res(t as NonNullable<T>));
    } else {
        return t;
    }
}

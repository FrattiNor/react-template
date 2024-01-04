// 判断是否为空
export const isEmpty = (v: any) => {
    if (
        v === '' ||
        v === null ||
        v === undefined ||
        (typeof v === 'number' && isNaN(v)) ||
        (Array.isArray(v) && v.length === 0) ||
        (Object.prototype.toString.call(v) === '[object Object]' && Object.keys(v).length === 0)
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

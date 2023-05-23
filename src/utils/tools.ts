export const isEmpty = (v: any) => {
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

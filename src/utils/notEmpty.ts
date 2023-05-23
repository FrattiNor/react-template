const notEmpty = <T>(t: T, res?: () => any): any => {
    if (
        t === '' ||
        t === null ||
        t === undefined ||
        (Array.isArray(t) && t.length === 0) ||
        (Object.prototype.toString.call(t) === '[object Object]' && Object.keys(t as Record<string, any>).length === 0)
    ) {
        return '-';
    } else if (typeof res === 'function') {
        return notEmpty(res());
    } else {
        return t;
    }
};

export default notEmpty;

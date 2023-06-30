export const getNumByStr = (v: string) => {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
};

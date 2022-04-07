export const sum = (a: number, b: number) => {
    return a + b;
};

export const asyncFun = (n: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(n);
        }, 1000);
    });
};

export const copy = (n: Record<string, string>) => {
    return { ...n };
};

export const createArray = (n: number) => {
    return Array(n).fill('');
};

export const throwError = (s: string) => {
    throw new Error(s);
};

export const getStr = (s: string) => {
    return s;
};

export const testInclude = (array: string[]) => {
    return array;
};

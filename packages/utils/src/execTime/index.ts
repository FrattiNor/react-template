/* eslint-disable prefer-const */
export const execTime = <T>(callBack: () => T) => {
    let res: T;
    const start = new Date().valueOf();
    res = callBack();
    console.log(new Date().valueOf() - start);
    return res;
};

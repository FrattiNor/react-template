export type PromiseFn = (...args: any[]) => Promise<any>;

export type Props<F extends PromiseFn> = {
    promiseFn: F;
};

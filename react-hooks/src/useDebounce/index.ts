import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type Fn<A extends Array<any>, R> = (...args: A) => R;
type ResFn<A extends Array<any>, R> = (...args: A) => R | null;

type Opt = {
    delay: number;
};

// 防抖
const useDebounce = <A extends Array<any>, R, F extends Fn<A, R>>(fn: F, opt?: Opt): ResFn<A, R> => {
    const { delay = 200 } = opt || {};
    const timeout = useRef<Timer | null>(null);

    const fn2 = (...args: any) => {
        let res = null;

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            res = fn(...args);
        }, delay);

        return res;
    };

    useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return fn2;
};

export default useDebounce;

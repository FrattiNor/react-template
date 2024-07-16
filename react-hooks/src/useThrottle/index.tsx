import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type Fn<A extends Array<any>, R> = (...args: A) => R;
type ResFn<A extends Array<any>, R> = (...args: A) => R | void;

type Opt = {
    delay: number;
};

// 节流
const useThrottle = <A extends Array<any>, R, F extends Fn<A, R>>(fn: F, opt?: Opt): ResFn<A, R> => {
    const flag = useRef(false);
    const { delay = 1000 } = opt || {};
    const timeout = useRef<Timer | null>(null);

    const fn2 = (...args: A) => {
        if (flag.current === false) {
            flag.current = true;
            fn(...args);

            timeout.current = setTimeout(() => {
                flag.current = false;
            }, delay);
        }
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

export default useThrottle;

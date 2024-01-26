import { useEffect, useRef } from 'react';

type Fn = (...args: any[]) => any;

const useThrottle = <F extends Fn>(fn: F, opt?: { throttle: number }) => {
    const flag = useRef(false);
    const { throttle = 1000 } = opt || {};
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const fn2 = (...args: any) => {
        if (flag.current === false) {
            flag.current = true;
            fn(...args);
            timeout.current = setTimeout(() => {
                flag.current = false;
            }, throttle);
        }
    };

    useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return fn2 as F;
};

export default useThrottle;

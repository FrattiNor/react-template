import { HandledProps } from '../useHandleProps';
import { useRef } from 'react';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const useTimeDebug = <T>(opt: Opt<T>) => {
    const ref = useRef<Record<string, number>>({});
    const { debug } = opt.handledProps;
    const isDev = process.env.NODE_ENV === 'development';
    const start = (key: string) => {
        if (debug && isDev) {
            console.log('%c%s', 'color: #4096ff;', `${key} start`);
            ref.current = {
                ...ref.current,
                [key]: new Date().valueOf(),
            };
        }
    };
    const end = (key: string) => {
        if (debug && isDev) {
            if (ref.current[key]) {
                const now = new Date().valueOf();
                const distance = now - ref.current[key];
                console.log('%c%s %c%s', 'color: #4096ff;', `${key} isEnd`, `color: ${distance > 30 ? '#f5222d' : '#389e0d'};`, `[${distance}ms]`);
                const nextRef = { ...ref.current };
                delete nextRef[key];
                ref.current = nextRef;
            } else {
                console.error(`${key} no start`);
            }
        }
    };

    return { start, end };
};

export type TimeDebug = ReturnType<typeof useTimeDebug>;
export default useTimeDebug;

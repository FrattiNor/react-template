import { RefObject, useEffect, useRef } from 'react';
import { TimeDebug } from '../useTimeDebug';

type Opt = {
    timeDebug: TimeDebug;
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    calcPing: () => void;
};

type Size = { scrollLeft: number; scrollTop: number };

type Handle = (size: Size) => void;

const useBodyScrollObserver = (opt: Opt) => {
    const handles = useRef<Record<string, Handle>>({});
    const size = useRef<Size>({ scrollLeft: 0, scrollTop: 0 });
    const { calcPing, bodyRef, headRef, timeDebug } = opt;

    useEffect(() => {
        if (bodyRef.current) {
            const onScroll = (e: Event) => {
                timeDebug.start('scroll');

                const target = e.target as HTMLDivElement;

                const nextSize = { scrollLeft: target.scrollLeft, scrollTop: target.scrollTop };

                Object.entries(handles.current).forEach(([key, handle]) => {
                    timeDebug.start(`scroll ${key}`);

                    handle(nextSize);

                    timeDebug.end(`scroll ${key}`);
                });

                size.current = nextSize;

                if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });

                calcPing();

                timeDebug.end('scroll');
            };

            bodyRef.current.addEventListener('scroll', onScroll, { passive: true });

            return () => {
                bodyRef.current?.removeEventListener('scroll', onScroll);
            };
        }
    }, []);

    const addHandle = (key: string, handle: Handle) => {
        handles.current = {
            ...handles.current,
            [key]: handle,
        };
        // 添加后立刻执行一次
        handle(size.current);
    };

    const removeHandle = (key: string) => {
        const newHandles = { ...handles.current };
        delete newHandles[key];
        handles.current = { ...newHandles };
    };

    return { addHandle, removeHandle };
};

export type BodyScrollObserver = ReturnType<typeof useBodyScrollObserver>;
export default useBodyScrollObserver;

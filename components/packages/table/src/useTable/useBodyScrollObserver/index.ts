import { RefObject, useEffect, useRef } from 'react';

type Opt = {
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    calcPing: () => void;
};

type Size = { scrollLeft: number; scrollTop: number };

type Handle = (size: Size) => void;

const useBodyScrollObserver = (opt: Opt) => {
    const handles = useRef<Record<string, Handle>>({});
    const size = useRef<Size>({ scrollLeft: 0, scrollTop: 0 });
    const { calcPing, bodyRef, headRef } = opt;

    useEffect(() => {
        if (bodyRef.current) {
            const onScroll = (e: Event) => {
                const target = e.target as HTMLDivElement;

                const nextSize = { scrollLeft: target.scrollLeft, scrollTop: target.scrollTop };

                Object.values(handles.current).forEach((handle) => {
                    handle(nextSize);
                });

                size.current = nextSize;

                if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });

                calcPing();
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

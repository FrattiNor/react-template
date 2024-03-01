import { RefObject, useEffect, useRef } from 'react';

type Opt = {
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    calcPing: () => void;
};

type Size = { scrollLeft: number; scrollTop: number };

type Handle = (size: Size) => void;

const useBodyScrollObserver = (opt: Opt) => {
    const verticalHandles = useRef<Record<string, Handle>>({});
    const horizontalHandles = useRef<Record<string, Handle>>({});
    const size = useRef<Size>({ scrollLeft: 0, scrollTop: 0 });
    const { calcPing, bodyRef, headRef } = opt;

    useEffect(() => {
        if (bodyRef.current) {
            const onScroll = (e: Event) => {
                const target = e.target as HTMLDivElement;

                const nextSize = { scrollLeft: target.scrollLeft, scrollTop: target.scrollTop };

                if (nextSize.scrollLeft !== size.current.scrollLeft) {
                    calcPing();

                    if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });

                    Object.values(horizontalHandles.current).forEach((handle) => {
                        handle(nextSize);
                    });
                }

                if (nextSize.scrollTop !== size.current.scrollTop) {
                    Object.values(verticalHandles.current).forEach((handle) => {
                        handle(nextSize);
                    });
                }

                size.current = nextSize;
            };

            bodyRef.current.addEventListener('scroll', onScroll, { passive: true });

            return () => {
                bodyRef.current?.removeEventListener('scroll', onScroll);
            };
        }
    }, []);

    const addHandle = (key: string, handle: Handle, type?: 'horizontal' | 'vertical') => {
        switch (type) {
            case 'horizontal':
                horizontalHandles.current = {
                    ...horizontalHandles.current,
                    [key]: handle,
                };
                break;
            case 'vertical':
                verticalHandles.current = {
                    ...verticalHandles.current,
                    [key]: handle,
                };
                break;
            default:
                horizontalHandles.current = {
                    ...horizontalHandles.current,
                    [key]: handle,
                };
                verticalHandles.current = {
                    ...verticalHandles.current,
                    [key]: handle,
                };
                break;
        }

        // 添加后立刻执行一次
        handle(size.current);
    };

    const removeHandle = (key: string) => {
        const newVerticalHandles = { ...verticalHandles.current };
        delete newVerticalHandles[key];
        verticalHandles.current = { ...newVerticalHandles };

        const newHorizontalHandles = { ...horizontalHandles.current };
        delete newHorizontalHandles[key];
        horizontalHandles.current = { ...newHorizontalHandles };
    };

    return { addHandle, removeHandle };
};

export type BodyScrollObserver = ReturnType<typeof useBodyScrollObserver>;
export default useBodyScrollObserver;

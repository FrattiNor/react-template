import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

type Opt = {
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    summaryRef: RefObject<HTMLDivElement | null>;
};

type ScrollSize = { scrollLeft: number; scrollTop: number };

type Listener = (scrollSize: ScrollSize) => void;

const useBodyScrollObserver = ({ bodyRef, headRef, summaryRef }: Opt) => {
    const scrollSize = useRef<ScrollSize>({ scrollLeft: 0, scrollTop: 0 });
    const verticalListeners = useRef<Record<string, Listener>>({});
    const horizontalListeners = useRef<Record<string, Listener>>({});

    useEffect(() => {
        if (bodyRef.current) {
            const onScroll = (e: Event) => {
                const target = e.target as HTMLDivElement;

                const nextScrollSize = { scrollLeft: target.scrollLeft, scrollTop: target.scrollTop };

                if (nextScrollSize.scrollLeft !== scrollSize.current.scrollLeft) {
                    // head,summary 和 body 横向滚动保持统一
                    if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });
                    if (summaryRef.current) summaryRef.current.scrollTo({ left: target.scrollLeft });

                    Object.values(horizontalListeners.current).forEach((handle) => {
                        handle(nextScrollSize);
                    });
                }

                if (nextScrollSize.scrollTop !== scrollSize.current.scrollTop) {
                    Object.values(verticalListeners.current).forEach((handle) => {
                        handle(nextScrollSize);
                    });
                }

                scrollSize.current = nextScrollSize;
            };

            bodyRef.current.addEventListener('scroll', onScroll, { passive: true });

            return () => {
                bodyRef.current?.removeEventListener('scroll', onScroll);
            };
        }
    }, []);

    // 添加监听器
    const addListener = (key: string, handle: Listener, type: 'horizontal' | 'vertical') => {
        switch (type) {
            case 'horizontal':
                horizontalListeners.current = {
                    ...horizontalListeners.current,
                    [key]: handle,
                };
                break;
            case 'vertical':
                verticalListeners.current = {
                    ...verticalListeners.current,
                    [key]: handle,
                };
                break;
        }
        // 添加后立刻执行一次
        handle(scrollSize.current);
    };

    // 移除监听器
    const removeListener = (key: string, type: 'horizontal' | 'vertical') => {
        switch (type) {
            case 'horizontal': {
                const newHorizontalListeners = { ...horizontalListeners.current };
                delete newHorizontalListeners[key];
                horizontalListeners.current = { ...newHorizontalListeners };
                break;
            }
            case 'vertical': {
                const newVerticalListeners = { ...verticalListeners.current };
                delete newVerticalListeners[key];
                verticalListeners.current = { ...newVerticalListeners };
                break;
            }
        }
    };

    return { addListener, removeListener };
};

export type BodyScrollObserver = ReturnType<typeof useBodyScrollObserver>;
export default useBodyScrollObserver;

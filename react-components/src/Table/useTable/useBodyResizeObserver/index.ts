import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

type Size1 = { width: null | number; height: null | number };

type Size2 = { width: number; height: number };

type Listener = (size: Size2) => void;

const useBodyResizeObserver = (bodyRef: RefObject<HTMLDivElement | null>) => {
    const listeners = useRef<Record<string, Listener>>({});
    const size = useRef<Size1>({ width: null, height: null });

    useEffect(() => {
        if (bodyRef.current) {
            const ob = new ResizeObserver((entries) => {
                const entry = entries[0];
                const nextSize: Size1 = { height: null, width: null };

                if (entry.borderBoxSize) {
                    const box = entry.borderBoxSize[0];
                    if (box) {
                        nextSize.width = box.inlineSize;
                        nextSize.height = box.blockSize;
                    }
                }

                if (typeof nextSize.height === 'number' && nextSize.height > 0 && typeof nextSize.width === 'number' && nextSize.width > 0) {
                    Object.values(listeners.current).forEach((listener) => listener(nextSize as Size2));
                }

                size.current = nextSize;
            });

            ob.observe(bodyRef.current);

            return () => {
                ob.disconnect();
            };
        }
    }, []);

    // 添加监听器
    const addListener = (key: string, handle: Listener) => {
        listeners.current = {
            ...listeners.current,
            [key]: handle,
        };

        // 添加后立刻执行一次
        const currentSize = size.current;
        if (typeof currentSize.height === 'number' && currentSize.height > 0 && typeof currentSize.width === 'number' && currentSize.width > 0) {
            handle(currentSize as Size2);
        }
    };

    // 移除监听器
    const removeListener = (key: string) => {
        const newListeners = { ...listeners.current };
        delete newListeners[key];
        listeners.current = { ...newListeners };
    };

    return { addListener, removeListener };
};

export type BodyResizeObserver = ReturnType<typeof useBodyResizeObserver>;
export default useBodyResizeObserver;

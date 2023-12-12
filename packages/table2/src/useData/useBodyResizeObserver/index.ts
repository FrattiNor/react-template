import { RefObject, useEffect, useRef, useState } from 'react';
import { CalcPingAndScrollBarWidth } from '../useCalcPingAndScrollBarWidth';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
    calcPingAndScrollBarWidth: CalcPingAndScrollBarWidth;
};

type Size1 = { width: null | number; height: null | number };

type Size2 = { width: number; height: number };

type Handle = (size: Size2) => void;

const useBodyResizeObserver = (opt: Opt) => {
    const handles = useRef<Record<string, Handle>>({});
    const { bodyRef, calcPingAndScrollBarWidth } = opt;
    const [size, setSize] = useState<Size1>({ width: null, height: null });

    useEffect(() => {
        if (bodyRef.current) {
            const ob = new ResizeObserver((entries) => {
                const entry = entries[0];
                const nextSize = { height: 0, width: 0 };
                if (entry.borderBoxSize) {
                    const box = entry.borderBoxSize[0];
                    if (box) {
                        nextSize.width = box.inlineSize;
                        nextSize.height = box.blockSize;
                    }
                }

                Object.values(handles.current).forEach((handle) => handle(nextSize));

                if (bodyRef.current) {
                    calcPingAndScrollBarWidth.calcPing(bodyRef.current);
                    calcPingAndScrollBarWidth.calcScrollBarWidth(bodyRef.current);
                }

                setSize(nextSize);
            });

            ob.observe(bodyRef.current, { box: 'border-box' });

            return () => {
                ob.disconnect();
            };
        }
    }, []);

    const addHandle = (key: string, handle: Handle) => {
        handles.current = {
            ...handles.current,
            [key]: handle,
        };

        // 添加后立刻执行一次
        if (typeof size.height === 'number' && typeof size.width === 'number') {
            handle(size as Size2);
        } else {
            const rect = bodyRef.current?.getBoundingClientRect();
            if (rect) handle(rect);
        }
    };

    const removeHandle = (key: string) => {
        const newHandles = { ...handles.current };
        delete newHandles[key];
        handles.current = { ...newHandles };
    };

    return { addHandle, removeHandle, size };
};

export type BodyResizeObserver = ReturnType<typeof useBodyResizeObserver>;
export default useBodyResizeObserver;

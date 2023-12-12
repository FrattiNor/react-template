import { RefObject, useEffect, useRef, useState } from 'react';
import { CalcPing } from '../useCalcPing';

type Opt = {
    calcPing: CalcPing;
    headRef: RefObject<HTMLDivElement | null>;
    bodyRef: RefObject<HTMLDivElement | null>;
    vScrollbarRef: RefObject<HTMLDivElement | null>;
    hScrollbarRef: RefObject<HTMLDivElement | null>;
};

type Size = { scrollLeft: number; scrollTop: number };

type Handle = (size: Size) => void;

const useBodyScrollObserver = (opt: Opt) => {
    const handles = useRef<Record<string, Handle>>({});
    const [size, setSize] = useState<Size>({ scrollLeft: 0, scrollTop: 0 });
    const { calcPing, bodyRef, headRef, vScrollbarRef, hScrollbarRef } = opt;

    useEffect(() => {
        if (bodyRef.current) {
            const onScroll = (e: Event) => {
                const target = e.target as HTMLDivElement;

                const nextSize = { scrollLeft: target.scrollLeft, scrollTop: target.scrollTop };

                Object.values(handles.current).forEach((handle) => handle(nextSize));

                setSize(nextSize);

                calcPing.calcPing(target);

                if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });
                if (hScrollbarRef.current) hScrollbarRef.current.scrollTo({ left: target.scrollLeft });
                if (vScrollbarRef.current) vScrollbarRef.current.scrollTo({ top: target.scrollTop });
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
        handle(size);
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

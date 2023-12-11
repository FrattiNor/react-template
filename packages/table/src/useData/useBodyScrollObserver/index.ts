import { RefObject, useEffect, useRef, useState } from 'react';

type Opt = {
    bodyRef: RefObject<HTMLDivElement | null>;
    headRef: RefObject<HTMLDivElement | null>;
};

type Size = { scrollLeft: number; scrollTop: number };

type Handle = (size: Size) => void;

const useBodyScrollObserver = (opt: Opt) => {
    const { bodyRef, headRef } = opt;
    const handles = useRef<Record<string, Handle>>({});
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);
    const [pingLeft, setPingLeft] = useState<boolean>(false);
    const [pingRight, setPingRight] = useState<boolean>(false);
    const size = useRef<Size>({ scrollLeft: 0, scrollTop: 0 });

    const ping: Record<string, boolean> = {
        left: pingLeft,
        right: pingRight,
    };

    // 计算纵向滚动条宽度
    const calcScrollBarWidth = (target: HTMLDivElement) => {
        const { clientWidth, offsetWidth } = target;
        setVScrollBarWidth(offsetWidth - clientWidth);
    };

    // 计算ping情况
    const calcPing = (target: HTMLDivElement) => {
        const { scrollWidth, clientWidth, scrollLeft } = target;

        if (scrollWidth === clientWidth) {
            setPingLeft(false);
            setPingRight(false);
        } else {
            setPingLeft(scrollLeft > 0);
            setPingRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        if (bodyRef.current) {
            const onScroll = (e: Event) => {
                const target = e.target as HTMLDivElement;

                size.current = { scrollLeft: target.scrollLeft, scrollTop: target.scrollTop };

                Object.values(handles.current).forEach((handle) => handle(size.current));

                calcPing(target);

                calcScrollBarWidth(target);

                if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });
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

    return { vScrollBarWidth, ping, addHandle, removeHandle };
};

export default useBodyScrollObserver;
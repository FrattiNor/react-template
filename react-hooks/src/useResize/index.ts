 
import { MouseEventHandler, useEffect, useReducer, useRef } from 'react';
import useLatest from '../useLatest';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

type ResizeOther = Record<string, any> | void;

type ResizeMark<M> = M extends void ? { pageX: number; pageY: number } : { pageX: number; pageY: number } & M;

type ResizeActive<A> = A extends void ? { moveX: number; moveY: number } : { moveX: number; moveY: number } & A;

type Props<M, A> = {
    beforeResize?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => M;
    onResizing?: (v: { event: MouseEvent; active: ResizeActive<void>; mark: ResizeMark<M> }) => A;
    afterResize?: (event: MouseEvent) => void;
};

const useResize = <M extends ResizeOther, A extends ResizeOther>(props: Props<M, A>) => {
    const resizedRef = useRef(false);
    const latestProps = useLatest(props);
    const rerender = useReducer(() => ({}), {})[1];
    const markRef = useRef<null | ResizeMark<M>>(null);
    const activeRef = useRef<null | ResizeActive<A>>(null);

    const onMouseDown: MouseEventHandler<HTMLElement> = (e) => {
        pauseEvent(e as any);
        const pageX = e.pageX;
        const pageY = e.pageY;
        const mark = { pageX, pageY };
        const { beforeResize } = latestProps.latest();
        const otherMark = beforeResize ? beforeResize(e) : {};
        markRef.current = { ...mark, ...otherMark } as ResizeMark<M>;
        rerender();
    };

    useEffect(() => {
        if (markRef.current) {
            const mouseMove = (e: MouseEvent) => {
                if (markRef.current) {
                    pauseEvent(e);
                    resizedRef.current = true;
                    const moveX = e.pageX - markRef.current.pageX;
                    const moveY = e.pageY - markRef.current.pageY;
                    const active = { moveX, moveY };
                    const { onResizing } = latestProps.latest();
                    const otherActive = onResizing ? onResizing({ event: e, active, mark: markRef.current }) : {};
                    activeRef.current = { ...active, ...otherActive } as ResizeActive<A>;
                    rerender();
                }
            };

            const mouseUp = (e: MouseEvent) => {
                pauseEvent(e);
                markRef.current = null;
                activeRef.current = null;
                const { afterResize } = latestProps.latest();
                if (afterResize) afterResize(e);
                rerender();
            };

            document.body.addEventListener('mouseup', mouseUp);
            document.body.addEventListener('mousemove', mouseMove);

            return () => {
                document.body.removeEventListener('mouseup', mouseUp);
                document.body.removeEventListener('mousemove', mouseMove);
            };
        }
    }, [markRef.current]);

    return {
        onMouseDown,
        mark: markRef.current,
        active: activeRef.current,
        resized: resizedRef.current,
    };
};

export default useResize;

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

type ResizeMark = { pageX: number; pageY: number };

type ResizeActive = { moveX: number; moveY: number };

type Props<MarkData, ActiveData, ResultData> = {
    beforeResize?: (v: { event: React.MouseEvent<HTMLElement, MouseEvent>; mark: ResizeMark }) => MarkData;
    onResizing?: (v: { event: MouseEvent; mark: ResizeMark; active: ResizeActive; markData: MarkData }) => ActiveData;
    afterResize?: (v: { event: MouseEvent; mark: ResizeMark; active: ResizeActive | null; markData: MarkData; activeData: ActiveData }) => ResultData;
};

const useResize = <MarkData, ActiveData, ResultData>(props: Props<MarkData, ActiveData, ResultData>) => {
    const resizedRef = useRef(false);
    const latestProps = useLatest(props);
    const rerender = useReducer(() => ({}), {})[1];
    const markRef = useRef<null | ResizeMark>(null);
    const activeRef = useRef<null | ResizeActive>(null);
    const markDataRef = useRef<undefined | MarkData>(undefined);
    const activeDataRef = useRef<undefined | ActiveData>(undefined);
    const resultDataRef = useRef<undefined | ResultData>(undefined);

    const onMouseDown: MouseEventHandler<HTMLElement> = (e) => {
        pauseEvent(e as any);
        const pageX = e.pageX;
        const pageY = e.pageY;
        markRef.current = { pageX, pageY };
        const { beforeResize } = latestProps.latest();
        markDataRef.current = beforeResize ? beforeResize({ event: e, mark: markRef.current }) : undefined;
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
                    activeRef.current = { moveX, moveY };
                    const { onResizing } = latestProps.latest();
                    activeDataRef.current = onResizing
                        ? onResizing({
                              event: e,
                              mark: markRef.current,
                              active: activeRef.current,
                              markData: markDataRef.current as MarkData,
                          })
                        : undefined;
                    rerender();
                }
            };

            const mouseUp = (e: MouseEvent) => {
                if (markRef.current) {
                    pauseEvent(e);
                    const { afterResize } = latestProps.latest();
                    resultDataRef.current = afterResize
                        ? afterResize({
                              event: e,
                              mark: markRef.current,
                              active: activeRef.current,
                              markData: markDataRef.current as MarkData,
                              activeData: activeDataRef.current as ActiveData,
                          })
                        : undefined;

                    markRef.current = null;
                    activeRef.current = null;
                    markDataRef.current = undefined;
                    activeDataRef.current = undefined;
                    rerender();
                }
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
        markData: markDataRef.current,
        activeData: activeDataRef.current,
        resultData: resultDataRef.current,
    };
};

export default useResize;

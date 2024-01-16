import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { HandledProps } from '../useHandleProps';
import { VirtualCore } from '../useVirtual';
import { TableColumns } from '../../type';
import { defaultWidth } from '../index';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

type ResizeTarget = { clientWidth: number; pageX: number; key: string };
type ResizeActive = { width: number; key: string };

type Opt<T> = {
    virtual: VirtualCore;
    handledProps: HandledProps<T>;
    sortedColumns: TableColumns<T>;
};

const useResizeWidth = <T,>(opt: Opt<T>) => {
    const resizedRef = useRef(false);
    const { handledProps, virtual, sortedColumns } = opt;
    const [resizeTarget, setResizeTarget] = useState<null | ResizeTarget>(null);
    const [resizeActive, setResizeActive] = useState<null | ResizeActive>(null);
    const resized = resizedRef.current;
    const resizeReadyKey = resizeTarget?.key;
    const resizeActiveKey = resizeActive?.key;
    const resizeActiveWidth = resizeActive?.width;
    const [resizeEndFlag, setResizeEndFlag] = useState(0);

    const onMouseDown = (key: string): MouseEventHandler<HTMLSpanElement> => {
        return (e) => {
            pauseEvent(e as any);
            const pageX = e.pageX;
            const clientWidth = (e.target as HTMLDivElement).parentElement?.clientWidth || 0;
            if (typeof pageX === 'number' && typeof clientWidth === 'number') {
                setResizeTarget({ key, pageX, clientWidth });
            }
        };
    };

    useEffect(() => {
        if (resizeTarget) {
            const mouseMove = (e: MouseEvent) => {
                pauseEvent(e);
                const moveX = e.pageX - resizeTarget.pageX;
                resizedRef.current = true;
                setResizeActive({
                    key: resizeTarget.key,
                    width: Math.min(Math.max(resizeTarget.clientWidth + moveX, 50), 1000),
                });
            };

            const mouseUp = (e: MouseEvent) => {
                pauseEvent(e);
                setResizeActive(null);
                setResizeTarget(null);
                setResizeEndFlag((c) => c + 1);
            };

            document.body.addEventListener('mouseup', mouseUp);
            document.body.addEventListener('mousemove', mouseMove);

            return () => {
                document.body.removeEventListener('mouseup', mouseUp);
                document.body.removeEventListener('mousemove', mouseMove);
            };
        }
    }, [resizeTarget]);

    // 触发结束事件
    useEffect(() => {
        if (resizeEndFlag > 0) {
            if (typeof handledProps.onResizeEnd === 'function') {
                const widths: Record<string, number> = {};
                sortedColumns.forEach(({ key, width }) => {
                    widths[key] = virtual.horizontalItemSizeCache.get(key) ?? width ?? defaultWidth;
                });
                handledProps.onResizeEnd(widths);
            }
        }
    }, [resizeEndFlag]);

    return { resizeReadyKey, resizeActiveKey, resizeActiveWidth, resized, onResizeStart: onMouseDown };
};

export type ResizeWidth = ReturnType<typeof useResizeWidth>;
export default useResizeWidth;

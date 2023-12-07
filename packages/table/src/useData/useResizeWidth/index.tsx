import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import ResizableTitle from './ResizableTitle';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

type ResizeTarget = { width: number; clientWidth: number; pageX: number; key: string };

const useResizeWidth = () => {
    const [resizeTarget, setResizeTarget] = useState<null | ResizeTarget>(null);
    const resizeActiveKey = resizeTarget?.key;
    const resizeActiveWidth = resizeTarget?.width;

    const onMouseDown = (key: string): MouseEventHandler<HTMLSpanElement> => {
        return (e) => {
            pauseEvent(e as any);
            const pageX = e.pageX;
            const clientWidth = (e.target as HTMLDivElement).parentElement?.clientWidth || 0;
            if (typeof pageX === 'number' && typeof clientWidth === 'number') {
                setResizeTarget({ key, pageX, clientWidth, width: clientWidth });
            }
        };
    };

    useEffect(() => {
        if (resizeTarget) {
            const mouseMove = (e: MouseEvent) => {
                pauseEvent(e);
                const moveX = e.pageX - resizeTarget.pageX;
                setResizeTarget({
                    ...resizeTarget,
                    width: Math.min(Math.max(resizeTarget.clientWidth + moveX, 50), 1000),
                });
            };

            const mouseUp = (e: MouseEvent) => {
                pauseEvent(e);
                setResizeTarget(null);
            };

            document.body.addEventListener('mouseup', mouseUp);
            document.body.addEventListener('mousemove', mouseMove);

            return () => {
                document.body.removeEventListener('mouseup', mouseUp);
                document.body.removeEventListener('mousemove', mouseMove);
            };
        }
    }, [resizeTarget]);

    const renderResizeTitle = (key: string, title: ReactNode) => {
        const showResize = !!key;
        if (!showResize) return title;
        const active = resizeActiveKey === key;
        return (
            <ResizableTitle onMouseDown={onMouseDown(key)} active={active}>
                {title}
            </ResizableTitle>
        );
    };

    return { renderResizeTitle, resizeActiveKey, resizeActiveWidth };
};

export default useResizeWidth;

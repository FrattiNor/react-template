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

type StartObj = { clientWidth: number; pageX: number; key: string };

const useResize = () => {
    const [start, setStart] = useState<null | StartObj>(null);
    const [recordWidths, setRecordWidths] = useState<Record<string, number>>({});

    const onMouseDown = (key: string): MouseEventHandler<HTMLSpanElement> => {
        return (e) => {
            pauseEvent(e as any);
            const pageX = e.pageX;
            const clientWidth = recordWidths[key] || 0;
            if (typeof pageX === 'number' && typeof clientWidth === 'number') {
                setStart({ key, pageX, clientWidth });
            }
        };
    };

    useEffect(() => {
        if (start) {
            const mouseMove = (e: MouseEvent) => {
                pauseEvent(e);
                const moveX = e.pageX - start.pageX;
                setRecordWidths((w) => ({
                    ...w,
                    [start.key]: Math.min(Math.max(start.clientWidth + moveX, 50), 1000),
                }));
            };

            const mouseUp = (e: MouseEvent) => {
                pauseEvent(e);
                setStart(null);
            };

            document.body.addEventListener('mouseup', mouseUp);
            document.body.addEventListener('mousemove', mouseMove);

            return () => {
                document.body.removeEventListener('mouseup', mouseUp);
                document.body.removeEventListener('mousemove', mouseMove);
            };
        }
    }, [start]);

    const renderResizeTitle = (key: string, title: ReactNode) => {
        const showResize = !!key;
        if (!showResize) return title;
        const active = start?.key === key;
        return (
            <ResizableTitle onMouseDown={onMouseDown(key)} active={active}>
                {title}
            </ResizableTitle>
        );
    };

    return { renderResizeTitle, setRecordWidths, recordWidths };
};

export default useResize;

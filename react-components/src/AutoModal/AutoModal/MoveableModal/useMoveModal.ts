import type { CSSProperties, MouseEventHandler } from 'react';
import { useRef, useState, useEffect, useReducer } from 'react';

type Style = { top: number; left: number };

const useMoveModal = () => {
    const timeout = useRef(0);
    const moveRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef<CSSProperties>({});
    const rerender = useReducer(() => ({}), {})[1];
    const [down, setDown] = useState<null | Style>(null);

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        setDown({ top: e.pageY, left: e.pageX });
    };

    useEffect(() => {
        if (down && moveRef.current) {
            const modalRect = moveRef.current.getBoundingClientRect();
            const minTop = 0;
            const minLeft = 0;
            const maxLeft = window.innerWidth - modalRect.width;
            const maxTop = window.innerHeight - modalRect.height;

            const mouseMoveFun = (e: MouseEvent) => {
                e.stopPropagation();
                cancelAnimationFrame(timeout.current);
                timeout.current = requestAnimationFrame(() => {
                    const top = e.pageY - down.top + modalRect.top;
                    const left = e.pageX - down.left + modalRect.left;
                    positionRef.current = {
                        position: 'absolute',
                        transform: 'translate3d(0,0,0)',
                        top: Math.max(minTop, Math.min(maxTop, top)),
                        left: Math.max(minLeft, Math.min(maxLeft, left)),
                    };
                    rerender();
                });
            };

            const mouseUpFun = (e: MouseEvent) => {
                e.stopPropagation();
                setDown(null);
            };

            document.addEventListener('mousemove', mouseMoveFun);
            document.addEventListener('mouseup', mouseUpFun);

            return () => {
                document.removeEventListener('mousemove', mouseMoveFun);
                document.removeEventListener('mouseup', mouseUpFun);
            };
        }
    }, [down]);

    return { moveRef, onMouseDown, position: positionRef.current };
};

export default useMoveModal;

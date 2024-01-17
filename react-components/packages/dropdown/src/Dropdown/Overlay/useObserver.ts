import { useEffect, useRef } from 'react';

type Opt = {
    overlayFollow?: boolean; // overlay 自动跟踪
    callback: () => void;
};

const useObserver = (target: HTMLElement, opt: Opt) => {
    const timeout = useRef(0);
    const { overlayFollow, callback } = opt;
    const targetPosition = useRef(target.getBoundingClientRect());

    useEffect(() => {
        if (overlayFollow) {
            const listener = () => {
                const newPosition = target.getBoundingClientRect();

                if (newPosition.x !== targetPosition.current.x || newPosition.y !== targetPosition.current.y) {
                    targetPosition.current = newPosition;
                    callback();
                }

                timeout.current = requestAnimationFrame(listener);
            };

            timeout.current = requestAnimationFrame(listener);

            return () => {
                cancelAnimationFrame(timeout.current);
            };
        }
    }, [overlayFollow]);
};

export default useObserver;

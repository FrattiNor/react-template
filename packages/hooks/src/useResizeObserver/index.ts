import ResizeObserver from 'resize-observer-polyfill';
import { useEffect, useState } from 'react';

const useResizeObserver = (ref: React.RefObject<HTMLElement | SVGElement | null>, opt?: { callback?: () => void }) => {
    const { callback } = opt || {};
    const [size, setSize] = useState<{ width: number | undefined; height: number | undefined }>({ width: undefined, height: undefined });

    useEffect(() => {
        if (ref.current) {
            const ob = new ResizeObserver((entries) => {
                const item = entries[0];
                setSize({ height: item.contentRect.height, width: item.contentRect.width });
                if (typeof callback === 'function') callback();
            });

            ob.observe(ref.current);

            return () => {
                ob.disconnect();
            };
        }
    }, []);

    return size;
};

export { ResizeObserver };
export default useResizeObserver;

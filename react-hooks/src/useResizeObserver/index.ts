import { useEffect, useState } from 'react';

type Ref = React.RefObject<HTMLElement | SVGElement | null>;
type Opt = { callback?: (rect: DOMRectReadOnly) => void };

const useResizeObserver = (ref: Ref, opt?: Opt) => {
    const { callback } = opt || {};
    const [size, setSize] = useState<{ width: number | undefined; height: number | undefined }>({ width: undefined, height: undefined });

    useEffect(() => {
        if (ref.current) {
            const ob = new ResizeObserver((entries) => {
                const item = entries[0];
                setSize({ height: item.contentRect.height, width: item.contentRect.width });
                if (typeof callback === 'function') callback(item.contentRect);
            });

            ob.observe(ref.current);

            return () => {
                ob.disconnect();
            };
        }
    }, []);

    return size;
};

export default useResizeObserver;

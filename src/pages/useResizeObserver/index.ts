import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Root = HTMLElement | null;
type CallbackParams = { height: number; width: number };
type Callback = (p: CallbackParams) => void;

const useResizeObserver = (root: Root, callback?: Callback) => {
    const [style, setStyle] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

    useEffect(() => {
        const ob = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const { height, width } = entry.contentRect;
                if (typeof callback === 'function') callback({ height, width });
                setStyle({ height, width });
            });
        });

        if (root) ob.observe(root);

        return () => {
            ob.disconnect();
        };
    }, [root]);

    return style;
};

export default useResizeObserver;

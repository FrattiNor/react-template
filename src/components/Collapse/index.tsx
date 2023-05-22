import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { easeInOut } from '@/utils/jsAnimate/timing';
import JsAnimate from '@/utils/jsAnimate';
import { Props } from './type';

const Collapse: FC<Props> = ({ children, visible }) => {
    const first = useRef(true);
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<CSSProperties>({ height: visible ? 'auto' : 0 });

    useEffect(() => {
        if (!first.current) {
            if (ref.current) {
                const totalHeight = ref.current.clientHeight;
                const animate = new JsAnimate({
                    draw: (p) => setStyle({ height: visible && p === 1 ? 'auto' : `${totalHeight * (visible ? p : 1 - p)}px` }),
                    timing: easeInOut,
                    duration: 250,
                });

                return () => animate.destroy();
            }
        } else {
            first.current = false;
        }
    }, [visible]);

    return (
        <div style={{ overflow: 'hidden', ...style }}>
            <div ref={ref}>{children}</div>
        </div>
    );
};

export default Collapse;

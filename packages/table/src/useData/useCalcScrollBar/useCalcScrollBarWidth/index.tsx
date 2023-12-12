import { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';

const useCalcScrollBarWidth = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [vScrollBarWidth, setVScrollBarWidth] = useState(0);
    const [hScrollBarWidth, setHScrollBarWidth] = useState(0);
    const calcScrollBarDom = <div className={styles['calc-scroll-bar']} ref={ref} />;

    const calcScrollBarWidth = (target: HTMLDivElement) => {
        const { clientWidth, offsetWidth, clientHeight, offsetHeight } = target;
        setVScrollBarWidth(offsetWidth - clientWidth);
        setHScrollBarWidth(offsetHeight - clientHeight);
    };

    useEffect(() => {
        if (ref.current) {
            const ob = new ResizeObserver(() => {
                if (ref.current) calcScrollBarWidth(ref.current);
            });

            ob.observe(ref.current);

            return () => {
                ob.disconnect();
            };
        }
    }, []);

    return { vScrollBarWidth, hScrollBarWidth, calcScrollBarDom };
};

export default useCalcScrollBarWidth;

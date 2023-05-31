import { CSSProperties, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';

const isVertical = () => {
    if (window.orientation == 90 || window.orientation == -90) {
        return false;
    }
    return true;
};

const Horizontal: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<CSSProperties>({});

    useEffect(() => {
        const setHorizontal = () => {
            if (ref.current) {
                if (isVertical()) {
                    setStyle({
                        width: ref.current.clientHeight,
                        height: ref.current.clientWidth,
                        transformOrigin: '0 0',
                        transform: `rotate(90deg) translateY(-${ref.current.clientWidth}px)`,
                    });
                } else {
                    setStyle({});
                }
            }
        };

        setHorizontal();
        window.addEventListener('resize', setHorizontal);

        return () => {
            window.removeEventListener('resize', setHorizontal);
        };
    }, []);

    return (
        <div ref={ref} className={styles['wrapper']}>
            <div className={styles['inner']} style={style}>
                {children}
            </div>
        </div>
    );
};

export default Horizontal;

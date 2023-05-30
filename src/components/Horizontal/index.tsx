import { CSSProperties, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';

const Horizontal: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<CSSProperties>({});

    useEffect(() => {
        if (ref.current) {
            setStyle({
                width: ref.current.clientHeight,
                height: ref.current.clientWidth,
                transformOrigin: '0 0',
                transform: `rotate(90deg) translateY(-${ref.current.clientWidth}px)`,
            });
        }
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

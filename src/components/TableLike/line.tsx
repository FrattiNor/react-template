import styles from './line.module.less';
import Context from './StrTableContext';
import { FC, useContext } from 'react';
import { LineProps } from './type';

const Line: FC<LineProps> = ({ children }) => {
    const { width, style, className } = useContext(Context);
    const child = Array.isArray(children) ? children : [children];
    return (
        <div className={styles['line']}>
            {child.map((item, i) => (
                <div key={i} style={{ width: width[i], ...(style[i] || {}) }} className={className[i]}>
                    {item}
                </div>
            ))}
        </div>
    );
};

export default Line;

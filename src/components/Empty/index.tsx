import { FC, PropsWithChildren } from 'react';
import styles from './index.module.less';
import EmptySvg from './emptySvg';

const Empty: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles['empty']}>
            <EmptySvg className={styles['icon']} />
            <span className={styles['font']}>{children || `暂无数据`}</span>
        </div>
    );
};

export default Empty;

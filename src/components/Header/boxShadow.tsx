import { FC, PropsWithChildren } from 'react';
import styles from './boxShadow.module.less';

const BoxShadow: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['box-shadow']} />
            <div className={styles['content']}>{children}</div>
        </div>
    );
};

export default BoxShadow;

import NativeKeepAlive from 'react-activation';
import styles from './index.module.less';
import { Props } from './type';
import { FC } from 'react';

const KeepAlive: FC<Props> = ({ children, ...props }) => {
    return (
        <div className={styles['keep-alive-wrapper']}>
            <NativeKeepAlive {...props}>{children}</NativeKeepAlive>
        </div>
    );
};

export default KeepAlive;

import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { useState } from 'react';

export const useFullScreen = () => {
    const [full, setFull] = useState<boolean>(false);

    const onClick = () => {
        setFull((v) => !v);
    };

    const closeFull = () => {
        setFull(false);
    };

    const fullScreenBtn = (
        <div className={styles['wrapper']} onClick={onClick}>
            <Iconfont icon="full-screen" />
        </div>
    );

    return { full, closeFull, fullScreenBtn };
};

export default useFullScreen;

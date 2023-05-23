import { InfiniteQuery2 } from '@/components/InfiniteList/Wrapper/type';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { FC } from 'react';

const RealtimeRefresh: FC<InfiniteQuery2<any>> = ({ remove, setParams }) => {
    const onClick = () => {
        remove();
        setParams({}); // 会触发请求
    };

    return (
        <div className={styles['wrapper']} onClick={onClick}>
            <Iconfont icon="refresh" />
        </div>
    );
};

export default RealtimeRefresh;

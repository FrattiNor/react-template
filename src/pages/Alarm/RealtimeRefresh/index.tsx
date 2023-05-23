import { InfiniteQuery2 } from '@/components/InfiniteList/Wrapper/type';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import { FC, useCallback } from 'react';
import { useMqtt } from '@/hooks';

const RealtimeRefresh: FC<InfiniteQuery2<any>> = ({ remove, setParams }) => {
    const onClick = () => {
        remove();
        setParams({}); // 会触发请求
    };

    useMqtt({
        onConnect: ({ client }) => {
            console.log(client);
        },
        onMessage: useCallback(() => {
            console.log('o');
        }, []),
    });

    return (
        <div className={styles['wrapper']} onClick={onClick}>
            <Iconfont icon="refresh" />
        </div>
    );
};

export default RealtimeRefresh;

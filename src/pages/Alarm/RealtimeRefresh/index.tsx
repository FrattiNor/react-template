import { InfiniteQuery2 } from '@/components/InfiniteList/Wrapper/type';
import { FC, useCallback, useState } from 'react';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import useMqtt from '@/hooks/useMqtt';
import classNames from 'classnames';

const RealtimeRefresh = (deviceId?: string) => {
    const Inner: FC<InfiniteQuery2<any>> = ({ remove, setParams }) => {
        const [newData, setNewData] = useState(false);

        const onClick = () => {
            remove();
            setParams({}); // 会触发请求
            setNewData(false);
        };

        useMqtt({
            onConnect: ({ client }) => {
                client.subscribe(deviceId ? `basic/device/alarm/count/${deviceId}` : 'basic/alarm/count');
            },
            onMessage: useCallback(() => {
                setNewData(true);
            }, []),
        });

        return (
            <div className={classNames(styles['wrapper'], { [styles['new-data']]: newData })} onClick={onClick}>
                <Iconfont icon="refresh" />
            </div>
        );
    };

    return Inner;
};

export default RealtimeRefresh;

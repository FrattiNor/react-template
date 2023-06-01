import Iconfont from '@/components/Iconfont';
import useFullScreen from '../FullScreen';
import styles from './index.module.less';
import Filter from '@/components/Filter';
import { FC, useEffect } from 'react';
import useFilter from './useFilter';
import { Popup } from 'antd-mobile';
import Content from './content';
import { Props } from './type';
import Switch from '../Switch';

const Realtime: FC<Props> = ({ realtimeData }) => {
    const filter = useFilter();
    const { play, setPlay, params, addAndDelParams } = realtimeData;
    const { fullScreenBtn, full, closeFull } = useFullScreen();

    // 取消挂载暂停
    useEffect(() => {
        return () => {
            setPlay(false);
        };
    }, []);

    return (
        <div className={styles['wrapper']}>
            {!full && (
                <Content realtimeData={realtimeData}>
                    {fullScreenBtn}
                    <Switch />
                    <Filter filterList={filter} params={params} addAndDelParams={addAndDelParams} />
                    <div className={styles['btn']} onClick={() => setPlay((v) => !v)}>
                        <Iconfont icon={play ? 'stop' : 'play'} />
                    </div>
                </Content>
            )}

            <Popup visible={full} bodyClassName={styles['popup']} position="left" onClose={closeFull} showCloseButton destroyOnClose>
                {full && <Content realtimeData={realtimeData} />}
            </Popup>
        </div>
    );
};

export default Realtime;

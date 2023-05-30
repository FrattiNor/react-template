import { FC, useEffect, useRef } from 'react';
import { getSeries } from '../History/utils';
import Iconfont from '@/components/Iconfont';
import useEcharts from '@/hooks/useEcharts';
import styles from './index.module.less';
import Filter from '@/components/Filter';
import useFilter from './useFilter';
import Switch from '../Switch';
import { Props } from './type';
import option from './option';

const Realtime: FC<Props> = ({ realtimeData }) => {
    const filter = useFilter();
    const ref = useRef<HTMLDivElement>(null);
    const [instance] = useEcharts(() => ref.current as HTMLDivElement);
    const { data, play, setPlay, params, addAndDelParams, empty, emptyTip } = realtimeData;

    // 更新option
    useEffect(() => {
        if (data && instance) {
            instance.setOption({ ...option, series: getSeries(data) }, true);
        }
    }, [data, instance]);

    // 取消挂载暂停
    useEffect(() => {
        return () => {
            setPlay(false);
        };
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div ref={ref} className={styles['chart']} style={{ visibility: empty ? 'hidden' : 'visible' }} />
            {empty && <div className={styles['empty']}>{emptyTip}</div>}
            <Filter filterList={filter} params={params} addAndDelParams={addAndDelParams} />
            <Switch />
            <div className={styles['btn']} onClick={() => setPlay((v) => !v)}>
                <Iconfont icon={play ? 'stop' : 'play'} />
            </div>
        </div>
    );
};

export default Realtime;

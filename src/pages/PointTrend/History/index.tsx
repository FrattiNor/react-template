import { FC, useEffect, useRef } from 'react';
import useEcharts from '@/hooks/useEcharts';
import Filter from '@/components/Filter';
import styles from './index.module.less';
import useFilter from './useFilter';
import { getSeries } from './utils';
import Switch from '../Switch';
import { Props } from './type';
import option from './option';

const History: FC<Props> = ({ historyData }) => {
    const filter = useFilter();
    const ref = useRef<HTMLDivElement>(null);
    const [instance] = useEcharts(() => ref.current as HTMLDivElement);
    const { data, params, addAndDelParams, empty, emptyTip } = historyData;

    // 更新option
    useEffect(() => {
        if (data && instance) {
            instance.setOption({ ...option, series: getSeries(data) }, true);
        }
    }, [data, instance]);

    return (
        <div className={styles['wrapper']}>
            <div ref={ref} className={styles['chart']} style={{ visibility: empty ? 'hidden' : 'visible' }} />
            {empty && <div className={styles['empty']}>{emptyTip}</div>}
            <Filter filterList={filter} params={params} addAndDelParams={addAndDelParams} />
            <Switch />
        </div>
    );
};

export default History;

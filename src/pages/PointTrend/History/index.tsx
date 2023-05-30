import { defaultParams, getEmpty, getRequestParams, getSeries } from './utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import getAddAndDelParams from '@/utils/addAndDelParams';
import { usePointHistory } from '@/services/pointTrend';
import useEcharts from '@/hooks/useEcharts';
import Filter from '@/components/Filter';
import styles from './index.module.less';
import useFilter from './useFilter';
import { Params } from './type';
import Switch from '../Switch';
import option from './option';

const History = () => {
    const filter = useFilter();
    const ref = useRef<HTMLDivElement>(null);
    const [instance] = useEcharts(() => ref.current as HTMLDivElement);
    const [params, setParams] = useState<Params>(defaultParams);
    const addAndDelParams = useCallback(getAddAndDelParams(setParams), []);
    const { data } = usePointHistory(getRequestParams(params));
    const { empty, emptyTip } = useMemo(() => getEmpty(data, params), [data, params]);

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

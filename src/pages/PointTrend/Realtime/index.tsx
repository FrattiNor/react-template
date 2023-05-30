import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import getAddAndDelParams from '@/utils/addAndDelParams';
import { getSeries } from '../History/utils';
import useEcharts from '@/hooks/useEcharts';
import styles from './index.module.less';
import Filter from '@/components/Filter';
import useFilter from './useFilter';
import { getEmpty } from './utils';
import { Params } from './type';
import useData from './useData';
import Switch from '../Switch';
import option from './option';

const Realtime = () => {
    const filter = useFilter();
    const ref = useRef<HTMLDivElement>(null);
    const [params, setParams] = useState<Params>({});
    const addAndDelParams = useCallback(getAddAndDelParams(setParams), []);
    const [instance] = useEcharts(() => ref.current as HTMLDivElement);
    const data = useData(params);
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

export default Realtime;

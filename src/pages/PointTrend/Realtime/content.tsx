import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { getSeries } from '../History/utils';
import useEcharts from '@/hooks/useEcharts';
import styles from './index.module.less';
import { Props } from './type';
import option from './option';

type ContentProps = PropsWithChildren<Props>;

const Content: FC<ContentProps> = ({ realtimeData, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [instance] = useEcharts(() => ref.current as HTMLDivElement);
    const { data, empty, emptyTip } = realtimeData;

    // 更新option
    useEffect(() => {
        if (data && instance) {
            instance.setOption({ ...option, series: getSeries(data) }, true);
        }
    }, [data, instance]);

    return (
        <div className={styles['chart-wrapper']}>
            <div ref={ref} className={styles['chart']} style={{ visibility: empty ? 'hidden' : 'visible' }} />
            {empty && <div className={styles['empty']}>{emptyTip}</div>}
            {children}
        </div>
    );
};

export default Content;

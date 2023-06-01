import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import useEcharts from '@/hooks/useEcharts';
import styles from './index.module.less';
import { getSeries } from './utils';
import { Props } from './type';
import option from './option';
import Empty from '@/components/Empty';

type ContentProps = PropsWithChildren<Props>;

const Content: FC<ContentProps> = ({ historyData, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [instance] = useEcharts(() => ref.current as HTMLDivElement);
    const { data, empty, emptyTip } = historyData;

    // 更新option
    useEffect(() => {
        if (data && instance) {
            instance.setOption({ ...option, series: getSeries(data) }, true);
        }
    }, [data, instance]);

    return (
        <div className={styles['chart-wrapper']}>
            <div ref={ref} className={styles['chart']} style={{ visibility: empty ? 'hidden' : 'visible' }} />
            {empty && (
                <div className={styles['empty']}>
                    <Empty>{emptyTip}</Empty>
                </div>
            )}
            {children}
        </div>
    );
};

export default Content;

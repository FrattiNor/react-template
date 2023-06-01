import VirtualizerList from '@/components/VirtualizerList';
import FactorySelect from './FactorySelect';
import styles from './index.module.less';
import { getColor } from './utils';
import useMqtt2 from './useMqtt2';
import useData from './useData';

const Overview2 = () => {
    const { currentShows, next, currentNodes, setCurrentNodes, tree } = useData();
    const alarmInfo = useMqtt2(currentShows);

    return (
        <div className={styles['wrapper']}>
            <FactorySelect factoryIds={currentNodes} setFactoryIds={setCurrentNodes} tree={tree} />

            <VirtualizerList
                rowKey="value"
                borderWidth={6}
                data={currentShows}
                renderItem={(item) => (
                    <div className={styles['item']} onClick={() => next(item.value)}>
                        <div className={styles['label']}>{item.label}</div>
                        <div className={styles['state']} style={{ backgroundColor: getColor(alarmInfo[item.value]) }} />
                    </div>
                )}
            />
        </div>
    );
};

export default Overview2;

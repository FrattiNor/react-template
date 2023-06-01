import VirtualizerList from '@/components/VirtualizerList';
import FactorySelect from './FactorySelect';
import styles from './index.module.less';
import useData from './useData';

const Overview2 = () => {
    const { currentShows, next, currentNodes, setCurrentNodes, tree } = useData();

    return (
        <div className={styles['wrapper']}>
            <FactorySelect factoryIds={currentNodes} setFactoryIds={setCurrentNodes} tree={tree} />

            <VirtualizerList
                rowKey="value"
                borderWidth={8}
                data={currentShows}
                renderItem={(item) => (
                    <div className={styles['item']} onClick={() => next(item.value)}>
                        {item.label}
                    </div>
                )}
            />
        </div>
    );
};

export default Overview2;

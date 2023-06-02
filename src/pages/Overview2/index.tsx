import useKeepAlive2 from '@/components/KeepAlive2/useKeepAlive2';
import VirtualizerList from '@/components/VirtualizerList';
import KeepAlive2 from '@/components/KeepAlive2';
import { useNavigate } from 'react-router-dom';
import FactorySelect from './FactorySelect';
import { HandleTreeItem } from './useTree';
import { SwipeAction } from 'antd-mobile';
import styles from './index.module.less';
import { getColor } from './utils';
import { FC, useRef } from 'react';
import useMqtt2 from './useMqtt2';
import useData from './useData';

type ItemProps = {
    data: HandleTreeItem;
    next: (id: string) => void;
    alarmInfo: Record<string, number>;
};

const Item: FC<ItemProps> = ({ data, next, alarmInfo }) => {
    const navigate = useNavigate();
    const { setCache } = useKeepAlive2();
    const ref = useRef<NodeJS.Timeout | number>(0);

    const onClick = () => {
        if (ref.current) clearTimeout(ref.current);
        next(data.value);
    };

    return (
        <SwipeAction
            rightActions={[
                {
                    text: '报警',
                    key: 'alarm',
                    color: 'danger',
                    onClick: () => {
                        setCache('overview', true).then(() => {
                            navigate(`/overview-alarm/${data.value}`);
                        });
                    },
                },
            ]}
        >
            <div className={styles['item']} onClick={onClick}>
                <div className={styles['label']}>{data.label}</div>
                <div className={styles['state']} style={{ backgroundColor: getColor(alarmInfo[data.value]) }} />
            </div>
        </SwipeAction>
    );
};

const KeepInner = () => {
    const { currentShows, next, currentNodes, setCurrentNodes, tree } = useData();
    const alarmInfo = useMqtt2(currentShows);

    return (
        <div className={styles['wrapper']}>
            <FactorySelect factoryIds={currentNodes} setFactoryIds={setCurrentNodes} tree={tree} />

            <VirtualizerList
                rowKey="value"
                borderWidth={6}
                data={currentShows}
                renderItem={(item) => <Item data={item} next={next} alarmInfo={alarmInfo} />}
            />
        </div>
    );
};

const Overview2 = () => {
    return (
        <KeepAlive2 cacheKey="overview">
            <KeepInner />
        </KeepAlive2>
    );
};

export default Overview2;

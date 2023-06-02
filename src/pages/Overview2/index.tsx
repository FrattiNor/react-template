import useKeepAlive2 from '@/components/KeepAlive2/useKeepAlive2';
import VirtualizerList from '@/components/VirtualizerList';
import KeepAlive2 from '@/components/KeepAlive2';
import { useNavigate } from 'react-router-dom';
import FactorySelect from './FactorySelect';
import { HandleTreeItem } from './useTree';
import { SwipeAction } from 'antd-mobile';
import styles from './index.module.less';
import classNames from 'classnames';
import { getColor } from './utils';
import { FC, useRef } from 'react';
import useMqtt2 from './useMqtt2';
import useData from './useData';

type ItemProps = {
    item: HandleTreeItem;
    next: (id: string) => void;
    haveNext: (id: string) => boolean;
    alarmInfo: Record<string, number>;
};

const Item: FC<ItemProps> = ({ item, next, haveNext, alarmInfo }) => {
    const { value, label } = item;
    const navigate = useNavigate();
    const { setCache } = useKeepAlive2();
    const ref = useRef<NodeJS.Timeout | number>(0);

    const onClick = () => {
        if (ref.current) clearTimeout(ref.current);
        next(value);
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
                            navigate(`/overview-alarm/${value}`);
                        });
                    },
                },
            ]}
        >
            <div className={classNames(styles['item'], { [styles['can-click']]: haveNext(value) })} onClick={onClick}>
                <div className={styles['label']}>{label}</div>
                <div className={styles['state']} style={{ backgroundColor: getColor(alarmInfo[value]) }} />
            </div>
        </SwipeAction>
    );
};

const KeepInner = () => {
    const { currentShows, next, currentNodes, setCurrentNodes, haveNext, tree } = useData();
    const alarmInfo = useMqtt2(currentShows);

    return (
        <div className={styles['wrapper']}>
            <FactorySelect factoryIds={currentNodes} setFactoryIds={setCurrentNodes} tree={tree} />

            <VirtualizerList
                rowKey="value"
                borderWidth={6}
                data={currentShows}
                renderItem={(item) => <Item item={item} alarmInfo={alarmInfo} next={next} haveNext={haveNext} />}
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

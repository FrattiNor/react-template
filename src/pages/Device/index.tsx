import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import InfiniteLists from '@/components/InfiniteLists';
import { useDeviceList } from '@/services/device';
import KeepAlive2 from '@/components/KeepAlive2';
import Header from '@/components/Header';
import useFilter from './Filter';
import useRender from './Render';
import { useEffect, useState } from 'react';

const KeepInner = ({ count }) => {
    const filterList = useFilter();
    const queryCard = useDeviceList(2);
    const queryMeter = useDeviceList(1);
    const { renderCardItem, renderMeterItem } = useRender();

    useEffect(() => {
        console.log(98, count);
    }, []);

    return (
        <Header boxShadow={false}>
            <InfiniteLists
                items={[
                    createInfiniteListItem({
                        title: '仪表',
                        rowKey: 'id',
                        query: queryMeter,
                        enableVisible: true,
                        filter: { filterList },
                        renderItem: renderMeterItem,
                    }),
                    createInfiniteListItem({
                        title: '卡件',
                        rowKey: 'id',
                        query: queryCard,
                        enableVisible: true,
                        filter: { filterList },
                        renderItem: renderCardItem,
                    }),
                ]}
            />
        </Header>
    );
};

const Device = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        console.log(99, count);
    }, [count]);

    useEffect(() => {
        setTimeout(() => {
            setCount(2);
        }, 2000);
    }, []);

    return (
        <KeepAlive2 cacheKey="device" wrapperStyle={{ height: '100%' }} contentStyle={'height: 100%'}>
            <KeepInner {...{ count, setCount }} />
        </KeepAlive2>
    );
};

export default Device;

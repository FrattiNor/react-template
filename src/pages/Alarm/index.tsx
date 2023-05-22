import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import InfiniteList from '@/components/InfiniteList';
import { useDeviceList } from '@/services/device';
import useFilters from './useFilters';
import Header from '@/components/Header';

const Alarm = () => {
    const filterList = useFilters();
    const queryMeter = useDeviceList(1);

    return (
        <Header>
            <InfiniteList
                {...createInfiniteListItem({
                    title: '仪表',
                    rowKey: 'id',
                    query: queryMeter,
                    enableVisible: true,
                    filter: { filterList },
                    renderItem: (item, { visible }) => <div style={{ height: visible ? 100 : 50 }}>{item.isdmTag}</div>,
                })}
            />
        </Header>
    );
};

export default Alarm;

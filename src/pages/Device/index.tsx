import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import InfiniteLists from '@/components/InfiniteLists';
import { useDeviceList } from '@/services/device';
import Header from '@/components/Header';
import useFilters from './useFilters';

const Device = () => {
    const filterList = useFilters();
    const queryCard = useDeviceList(2);
    const queryMeter = useDeviceList(1);

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
                        renderItem: (item, { visible }) => <div style={{ height: visible ? 100 : 50 }}>{item.isdmTag}</div>,
                    }),
                    createInfiniteListItem({
                        title: '卡件',
                        rowKey: 'id',
                        query: queryCard,
                        enableVisible: true,
                        filter: { filterList },
                        renderItem: (item, { visible }) => <div style={{ height: visible ? 100 : 50 }}>{item.isdmTag}</div>,
                    }),
                ]}
            />
        </Header>
    );
};

export default Device;

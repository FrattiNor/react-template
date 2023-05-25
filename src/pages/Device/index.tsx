import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import InfiniteLists from '@/components/InfiniteLists';
import { useDeviceList } from '@/services/device';
import KeepAlive from '@/components/KeepAlive';
import Header from '@/components/Header';
import useFilter from './Filter';
import useRender from './Render';

const KeepInner = () => {
    const filterList = useFilter();
    const queryCard = useDeviceList(2);
    const queryMeter = useDeviceList(1);
    const { renderCardItem, renderMeterItem } = useRender();

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
    return (
        <KeepAlive id="device">
            <KeepInner />
        </KeepAlive>
    );
};

export default Device;

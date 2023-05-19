import InfiniteList from '@/components/InfiniteList';
import { useDeviceList } from '@/services/device';
import useFilters from './useFilters';

const Device = () => {
    const query = useDeviceList(1);
    const filterList = useFilters();

    return (
        <InfiniteList
            rowKey="id"
            enableVisible
            query={query}
            renderItem={(item, { visible }) => <div style={{ height: visible ? 100 : 50 }}>{item.isdmTag}</div>}
            filter={{ filterList }}
        />
    );
};

export default Device;

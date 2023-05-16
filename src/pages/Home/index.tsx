import InfiniteList from '@/components/InfiniteList';
import { useDeviceList } from '@/services/device';

const Device = () => {
    const query = useDeviceList(1);
    return (
        <InfiniteList
            rowKey="id"
            enableVisible
            query={query}
            renderItem={(item, visible) => <div style={{ height: visible ? 100 : 50 }}>{item.isdmTag}</div>}
        />
    );
};

export default Device;

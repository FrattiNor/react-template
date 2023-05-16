import InfiniteList from '@/components/InfiniteList';
import { useDeviceList } from '@/services/device';

const Device = () => {
    const query = useDeviceList(1);
    return <InfiniteList query={query} renderItem={(item) => <div>{item.isdmTag}</div>} rowKey="id" />;
};

export default Device;

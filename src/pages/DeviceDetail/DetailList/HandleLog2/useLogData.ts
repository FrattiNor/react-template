import createInfiniteListItem from '@/components/InfiniteLists/utils/createInfiniteListItem';
import { useHandleLogList } from '@/services/handleLog';
import { useFilter } from './Filter';
import { useRender } from './Render';

const useLogData = (isdmTag?: string) => {
    const filter = useFilter();
    const query = useHandleLogList(isdmTag);

    const renderLogItem = useRender();

    const logData = createInfiniteListItem({
        title: '操作日志',
        rowKey: 'id',
        query: query,
        enableVisible: true,
        renderItem: renderLogItem,
        filter: { filterList: filter },
    });

    return logData;
};

export default useLogData;

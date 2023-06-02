import createInfiniteListItem from '@/components/InfiniteLists/utils/createInfiniteListItem';
import { useOverviewAlarmHistory } from '@/services/overviewAlarm';
import InfiniteLists from '@/components/InfiniteLists';
import { useParams } from 'react-router-dom';
import { useRender } from '../Alarm/Render';
import useFilter from '../Alarm/Filter';

const OverviewAlarm = () => {
    const { factoryModelId } = useParams<{ factoryModelId: string }>();
    const queryHistory = useOverviewAlarmHistory(factoryModelId as string);
    const { renderHistoryItem } = useRender();
    const { historyFilter } = useFilter();

    const historyData = createInfiniteListItem({
        title: '历史报警',
        rowKey: 'alarmId',
        query: queryHistory,
        enableVisible: true,
        renderItem: renderHistoryItem,
        filter: { filterList: historyFilter },
    });

    return <InfiniteLists items={[historyData]} />;
};

export default OverviewAlarm;

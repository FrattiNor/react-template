import createInfiniteListItem from '@/components/InfiniteLists/utils/createInfiniteListItem';
import { useAlarmHistoryList, useAlarmRealtimeList } from '@/services/alarm';
import useHaveNew from './RealtimeRefresh/useHaveNew';
import RealtimeRefresh from './RealtimeRefresh';
import { useRender } from './Render';
import useFilter from './Filter';
import { useMemo } from 'react';

// 单独提取出来数据，可以提供给设备台账详情使用
const useAlarmData = ({ deviceId, factoryModelId }: { deviceId?: string; factoryModelId?: string }) => {
    const queryHistory = useAlarmHistoryList({ deviceId, factoryModelId });
    const queryRealtime = useAlarmRealtimeList({ deviceId, factoryModelId });
    const { haveNew, setHaveNew } = useHaveNew({ deviceId, factoryModelId });
    const { historyFilter, realtimeFilter } = useFilter({ deviceId, factoryModelId });
    const { renderHistoryItem, renderRealtimeItem } = useRender();
    const RealtimeRefreshFC = useMemo(() => RealtimeRefresh({ haveNew, setHaveNew }), [haveNew]);

    const historyData = createInfiniteListItem({
        title: '历史报警',
        rowKey: 'alarmId',
        query: queryHistory,
        enableVisible: true,
        renderItem: renderHistoryItem,
        filter: { filterList: historyFilter },
    });

    const realtimeData = createInfiniteListItem({
        title: '实时报警',
        rowKey: 'alarmId',
        query: queryRealtime,
        enableVisible: true,
        renderItem: renderRealtimeItem,
        float: { render: RealtimeRefreshFC },
        filter: { filterList: realtimeFilter },
    });

    return { historyData, realtimeData };
};

export default useAlarmData;

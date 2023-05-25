import { useAlarmHistoryList, useAlarmRealtimeList } from '@/services/alarm';
import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import InfiniteLists from '@/components/InfiniteLists';
import RealtimeRefresh from './RealtimeRefresh';
import Header from '@/components/Header';
import { useRender } from './Render';
import { useMemo } from 'react';
import useFilter from './Filter';

const Device = () => {
    const queryHistory = useAlarmHistoryList();
    const queryRealtime = useAlarmRealtimeList();
    const { historyFilter, realtimeFilter } = useFilter();
    const { renderHistoryItem, renderRealtimeItem } = useRender();
    const RealtimeRefreshFC = useMemo(() => RealtimeRefresh(), []);

    return (
        <Header boxShadow={false}>
            <InfiniteLists
                items={[
                    createInfiniteListItem({
                        title: '历史报警',
                        rowKey: 'alarmId',
                        query: queryHistory,
                        enableVisible: true,
                        renderItem: renderHistoryItem,
                        filter: { filterList: historyFilter },
                    }),
                    createInfiniteListItem({
                        title: '实时报警',
                        rowKey: 'alarmId',
                        query: queryRealtime,
                        enableVisible: true,
                        renderItem: renderRealtimeItem,
                        float: { render: RealtimeRefreshFC },
                        filter: { filterList: realtimeFilter },
                    }),
                ]}
            />
        </Header>
    );
};

export default Device;

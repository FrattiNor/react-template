import { getAlarmHistoryList, getAlarmRealtimeList } from './api';
import { useInfiniteQuery2 } from '@/hooks';

// 获取历史报警列表
export const useAlarmHistoryList = () => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmHistory'],
        queryFn: (p) => getAlarmHistoryList({ pagination: p.paginationParams, param: p.params }),
        // arrayToString: ['sourceType', 'devMode', 'mfrName', 'mfrAndDevice'],
    });
};

// 获取实时报警列表
export const useAlarmRealtimeList = () => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmRealtime'],
        queryFn: (p) => getAlarmRealtimeList({ ...p.paginationParams, ...p.params }),
        // arrayToString: ['sourceType', 'devMode', 'mfrName', 'mfrAndDevice'],
    });
};

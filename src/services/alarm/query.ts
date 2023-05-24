import { getAlarmHistoryList, getAlarmRealtimeList, getAreaOption } from './api';
import { useInfiniteQuery2, useQuery2 } from '@/hooks';

// 获取历史报警
export const useAlarmHistoryList = () => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmHistory'],
        queryFn: (p) => getAlarmHistoryList({ pagination: p.paginationParams, param: p.params }),
        formatTime: { startTime: 'YYYY-MM-DD HH:mm:ss', endTime: 'YYYY-MM-DD HH:mm:ss' },
    });
};

// 获取实时报警
export const useAlarmRealtimeList = () => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmRealtime'],
        queryFn: (p) => getAlarmRealtimeList({ ...p.paginationParams, ...p.params }),
        arrayToString: ['areaId', 'alarmType'],
    });
};

// 获取装置【筛选项】
export const useAreaOption = () => {
    return useQuery2({
        queryKey: ['areaList'],
        queryFn: () => getAreaOption(),
    });
};

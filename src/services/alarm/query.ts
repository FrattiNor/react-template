import { getAlarmHistoryList, getAlarmRealtimeList, getAreaOption } from './api';
import useInfiniteQuery2 from '@/hooks/useInfiniteQuery2';
import useQuery2 from '@/hooks/useQuery2';

// 获取历史报警【设备详情额外添加deviceId参数】
export const useAlarmHistoryList = (deviceId?: string) => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmHistory', deviceId],
        queryFn: (p) => getAlarmHistoryList({ pagination: p.paginationParams, param: { ...p.params, ...(deviceId ? { deviceId } : {}) } }),
        formatTime: { startTime: 'YYYY-MM-DD HH:mm:ss', endTime: 'YYYY-MM-DD HH:mm:ss' },
    });
};

// 获取实时报警【设备详情额外添加deviceId参数】
export const useAlarmRealtimeList = (deviceId?: string) => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmRealtime', deviceId],
        queryFn: (p) => getAlarmRealtimeList({ ...p.paginationParams, ...p.params, ...(deviceId ? { deviceId } : {}) }),
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

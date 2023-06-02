import { getAlarmHistoryList, getAlarmRealtimeList, getAreaOption } from './api';
import useInfiniteQuery2 from '@/hooks/useInfiniteQuery2';
import useQuery2 from '@/hooks/useQuery2';

// 获取历史报警【设备详情额外添加deviceId参数】【工厂报警额外添加factoryModelId参数】
export const useAlarmHistoryList = ({ deviceId, factoryModelId }: { deviceId?: string; factoryModelId?: string }) => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmHistory', deviceId, factoryModelId],
        queryFn: (p) => {
            return getAlarmHistoryList({
                pagination: p.paginationParams,
                param: { ...p.params, ...(deviceId ? { deviceId } : {}), ...(factoryModelId ? { factoryModelId } : {}) },
            });
        },
        formatTime: { startTime: 'YYYY-MM-DD HH:mm:ss', endTime: 'YYYY-MM-DD HH:mm:ss' },
    });
};

// 获取实时报警【设备详情额外添加deviceId参数】【工厂报警额外添加factoryModelId参数】
export const useAlarmRealtimeList = ({ deviceId, factoryModelId }: { deviceId?: string; factoryModelId?: string }) => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['alarmRealtime', deviceId, factoryModelId],
        queryFn: (p) => {
            return getAlarmRealtimeList({
                ...p.params,
                ...p.paginationParams,
                ...(deviceId ? { deviceId } : {}),
                ...(factoryModelId ? { factoryModelId } : {}),
            });
        },
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

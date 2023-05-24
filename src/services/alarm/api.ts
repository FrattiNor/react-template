import { AlarmHistoryItem, AlarmRealtimeItem, AreaItem } from './type';
import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';
import { ListData } from '@/global';

// 获取历史报警列表
export const getAlarmHistoryList = (data: Record<string, any>) => {
    return request.POST<ListData<AlarmHistoryItem>>({
        url: `${proxyPrefix.basic}/alarm/searchByTag`,
        data,
    });
};

// 获取实时报警列表
export const getAlarmRealtimeList = (params: Record<string, any>) => {
    return request.GET<ListData<AlarmRealtimeItem>>({
        url: `${proxyPrefix.basic}/realtime/alarm`,
        params,
    });
};

// 获取装置列表
export const getAreaList = () => {
    return request.GET<AreaItem[]>({
        url: `${proxyPrefix.basic}/hierarchy/areaList`,
    });
};

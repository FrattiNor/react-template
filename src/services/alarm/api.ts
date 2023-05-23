import { AlarmHistoryListItem, AlarmRealtimeListItem, AreaItem } from './type';
import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';
import { ListData } from '@/global';

// 获取历史报警列表
export const getAlarmHistoryList = (data: Record<string, any>) => {
    return request.POST<ListData<AlarmHistoryListItem>>({
        url: `${proxyPrefix.basic}/alarm/searchByTag`,
        data,
    });
};

// 获取实时报警列表
export const getAlarmRealtimeList = (params: Record<string, any>) => {
    return request.GET<ListData<AlarmRealtimeListItem>>({
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

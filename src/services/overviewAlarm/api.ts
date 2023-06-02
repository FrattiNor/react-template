import proxyPrefix from '@proxy/proxyPrefix';
import { AlarmHistoryItem } from '../alarm';
import request from '@/utils/request';
import { ListData } from '@/global';

// 总貌图历史报警
export const getOverviewAlarmHistory = (factoryModelId: string, params: Record<string, any>) => {
    return request.GET<ListData<AlarmHistoryItem>>({
        url: `${proxyPrefix.basic}/alarm/history/factory-model/${factoryModelId}`,
        params: params,
    });
};

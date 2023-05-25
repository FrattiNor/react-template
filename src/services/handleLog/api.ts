import proxyPrefix from '@proxy/proxyPrefix';
import { HandleLogItem } from './type';
import request from '@/utils/request';
import { ListData } from '@/global';

// 获取操作日志
export const getHandleLogList = (params: any) => {
    return request.GET<ListData<HandleLogItem>>({
        url: `${proxyPrefix.log}/v2/audit/log`,
        params,
    });
};

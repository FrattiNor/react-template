import { PointHistoryParams, PointItem, PointItem2 } from './type';
import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';

// 获取位号历史
export const getPointHistory = (data: PointHistoryParams) => {
    return request.POST<Record<string, PointItem[]>>({
        url: `${proxyPrefix.history}/history/down-sampling`,
        data,
    });
};

// 根据fullPointTag搜索位号【100条】
export const getSearchPointList = (params: { fullPointTag?: string; deviceId?: string }) => {
    return request.GET<PointItem2[]>({
        url: `${proxyPrefix.realtime}/point/option`,
        params,
    });
};

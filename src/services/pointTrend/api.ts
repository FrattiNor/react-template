import { PointHistoryParams, PointItem } from './type';
import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';

// 获取位号历史
export const getPointHistory = (data: PointHistoryParams) => {
    return request.POST<Record<string, PointItem[]>>({
        url: `${proxyPrefix.history}/history/down-sampling`,
        data,
    });
};

import { PointHistoryParams } from './type';
import useQuery2 from '@/hooks/useQuery2';
import { getPointHistory, getSearchPointList } from './api';

// 获取位号历史
export const usePointHistory = (data: Partial<PointHistoryParams>) => {
    const { startTime, endTime, fullPointTags } = data;
    return useQuery2({
        queryKey: ['point-history', data],
        enabled: !!(startTime && endTime && Array.isArray(fullPointTags) && fullPointTags.length > 0),
        queryFn: () => getPointHistory(data as PointHistoryParams),
    });
};

// 根据fullPointTag搜索位号【100条】
export const useSearchPointList = (fullPointTag: string) => {
    return useQuery2({
        queryKey: ['point-history', fullPointTag],
        enabled: !!fullPointTag,
        queryFn: () => getSearchPointList({ fullPointTag }),
    });
};

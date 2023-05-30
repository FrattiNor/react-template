import { PointHistoryParams } from './type';
import useQuery2 from '@/hooks/useQuery2';
import { getPointHistory } from './api';

// 获取位号历史
export const usePointHistory = (data: PointHistoryParams) => {
    return useQuery2({
        queryKey: ['point-history', data],
        enabled: !!(data.fullPointTags && data.startTime && data.endTime),
        queryFn: () => getPointHistory(data),
    });
};

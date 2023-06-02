import useInfiniteQuery2 from '@/hooks/useInfiniteQuery2';
import { getOverviewAlarmHistory } from './api';

// 获取设备
export const useOverviewAlarmHistory = (id: string) => {
    return useInfiniteQuery2({
        delay: 700,
        enabled: !!id,
        queryKey: ['overview-history-alarm', id],
        queryFn: (p) => getOverviewAlarmHistory(id, { ...p.paginationParams, ...p.params }),
        formatTime: { startTime: 'YYYY-MM-DD HH:mm:ss', endTime: 'YYYY-MM-DD HH:mm:ss' },
    });
};

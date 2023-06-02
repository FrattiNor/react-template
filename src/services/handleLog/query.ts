import useInfiniteQuery2 from '@/hooks/useInfiniteQuery2';
import { getHandleLogList } from './api';

// 获取操作日志【设备详情额外添加isdmTag参数】
export const useHandleLogList = (isdmTag?: string) => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['handleLog', isdmTag],
        enabled: typeof isdmTag === 'string',
        queryFn: (p) => {
            return getHandleLogList({
                ...p.params,
                resName: isdmTag,
                pageSize: p.paginationParams.pageSize,
                currentPage: p.paginationParams.current,
            });
        },
        formatTime: { startTime: 'YYYY-MM-DD HH:mm:ss', endTime: 'YYYY-MM-DD HH:mm:ss' },
    });
};

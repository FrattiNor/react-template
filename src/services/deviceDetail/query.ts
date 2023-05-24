import { getDeviceDetailInfo } from './api';
import useQuery2 from '@/hooks/useQuery2';

// 获取设备详情信息
export const useDeviceDetailInfo = (id?: string) => {
    return useQuery2({
        queryKey: ['deviceDetail', id],
        enabled: typeof id === 'string',
        queryFn: () => getDeviceDetailInfo(id!),
    });
};

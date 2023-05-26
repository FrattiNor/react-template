import { getDeviceDetailInfo } from './api';
import useQuery2 from '@/hooks/useQuery2';

// 获取设备详情信息
export const useDeviceDetailInfo = (deviceId?: string) => {
    return useQuery2({
        queryKey: ['deviceDetail', deviceId],
        enabled: typeof deviceId === 'string',
        queryFn: () => getDeviceDetailInfo(deviceId as string),
    });
};

import { getDeviceListV2, getDeviceModelList } from './api';
import { useInfiniteQuery2, useQuery2 } from '@/hooks';

// 获取设备列表
export const useDeviceList = (view: number) => {
    return useInfiniteQuery2({
        delay: 500,
        queryKey: ['device', view],
        queryFn: (p) => getDeviceListV2({ view, ...p.paginationParams, ...p.params }),
    });
};

// 获取设备类型
export const useDeviceModelList = () => {
    return useQuery2({
        queryKey: ['device-model'],
        queryFn: () => getDeviceModelList(),
    });
};

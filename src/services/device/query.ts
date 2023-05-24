import { getDeviceListV2, getDeviceMfrOption, getDeviceModelOption } from './api';
import useInfiniteQuery2 from '@/hooks/useInfiniteQuery2';
import useQuery2 from '@/hooks/useQuery2';

// 获取设备
export const useDeviceList = (view: number) => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['device', view],
        queryFn: (p) => getDeviceListV2({ view, ...p.paginationParams, ...p.params }),
        arrayToString: ['sourceType', 'devMode', 'mfrName', 'mfrAndDevice'],
    });
};

// 获取设备类型【筛选项】
export const useDeviceModelOption = () => {
    return useQuery2({
        queryKey: ['deviceModel'],
        queryFn: () => getDeviceModelOption(),
    });
};

// 获取厂商【筛选项】
export const useDeviceMfrOption = () => {
    return useQuery2({
        queryKey: ['deviceMfr'],
        queryFn: () => getDeviceMfrOption(),
    });
};

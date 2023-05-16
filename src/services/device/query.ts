import { useInfiniteList } from '@/hooks';
import { getDeviceListV2 } from './api';

export const useDeviceList = (view: number) => {
    return useInfiniteList({
        queryKey: ['device', view],
        fetchFn: (p) => getDeviceListV2({ view, ...p.paginationParams, ...p.params }),
    });
};

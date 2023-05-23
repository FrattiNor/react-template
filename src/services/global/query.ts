import { getConstValues } from './api';
import { useQuery2 } from '@/hooks';

// 获取ConstValue
export const useConstValue = () => {
    return useQuery2({
        queryKey: ['constValue'],
        queryFn: () => getConstValues(),
        staleTime: Infinity,
        cacheTime: Infinity,
    });
};

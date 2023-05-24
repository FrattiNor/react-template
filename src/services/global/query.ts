import useQuery2 from '@/hooks/useQuery2';
import { getConstValues } from './api';

// 获取ConstValue
export const useConstValue = () => {
    return useQuery2({
        queryKey: ['constValue'],
        queryFn: () => getConstValues(),
        staleTime: Infinity,
        cacheTime: Infinity,
    });
};

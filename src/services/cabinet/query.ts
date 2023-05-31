import { getCardInfo, getECS700Detail } from './api';
import useQuery2 from '@/hooks/useQuery2';

// 获取ECS700机柜详情
export const useECS700Detail = (id: string) => {
    return useQuery2({
        enabled: !!id,
        queryKey: ['ecs700-detail', id],
        queryFn: () => getECS700Detail(id),
    });
};

// 获取卡件详情
export const useCardInfo = (id: string) => {
    return useQuery2({
        enabled: !!id,
        queryKey: ['card-info', id],
        queryFn: () => getCardInfo(id),
    });
};

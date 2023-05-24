import { useInfiniteQuery2 } from '@/hooks';
import { getKnowledgeList } from './api';

// 获取知识库列表
export const useKnowledgeList = () => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['knowledge'],
        queryFn: (p) => getKnowledgeList({ ...p.paginationParams, ...p.params }),
    });
};

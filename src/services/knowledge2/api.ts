import proxyPrefix from '@proxy/proxyPrefix';
import { KnowledgeItem } from './type';
import request from '@/utils/request';
import { ListData } from '@/global';

// 获取知识库列表
export function getKnowledgeList(data: Record<string, any>) {
    return request.POST<ListData<KnowledgeItem>>({
        url: `${proxyPrefix.knowledge}/knowledge/list`,
        data,
    });
}

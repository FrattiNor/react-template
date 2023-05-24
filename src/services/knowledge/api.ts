import proxyPrefix from '@proxy/proxyPrefix';
import { DeviceModelItem, FactoryModelItem, KnowledgeItem, KnowledgeTagItem } from './type';
import request from '@/utils/request';
import { ListData } from '@/global';

// 获取知识库列表
export function getKnowledgeList(data: Record<string, any>) {
    return request.POST<ListData<KnowledgeItem>>({
        url: `${proxyPrefix.knowledge}/knowledge/list`,
        data,
    });
}

// 下载文件
export function downloadFile(md5: string) {
    return request.GET<Blob>({
        url: `${proxyPrefix.knowledge}/knowledge/downloadFile`,
        responseType: 'blob',
        params: { md5 },
    });
}

// 获取文件url，预览
export function getFileUrl(md5: string) {
    return request.GET<string>({
        url: `${proxyPrefix.knowledge}/knowledge/getFileUrl`,
        params: { md5 },
    });
}

// 获取工厂模型【筛选项】【知识库模块】
export function getFactoryModelTreeOption() {
    return request.GET<FactoryModelItem[]>({
        url: `${proxyPrefix.knowledge}/knowledge/getFactoryModelTree`,
    });
}

// 获取设备类型【筛选项】【知识库模块】
export function getDeviceModelOption() {
    return request.GET<DeviceModelItem[]>({
        url: `${proxyPrefix.knowledge}/knowledge/getDeviceModelList`,
    });
}

// 获取知识标签【筛选项】
export function getKnowledgeTagOption() {
    return request.GET<KnowledgeTagItem[]>({
        url: `${proxyPrefix.knowledge}/classification/findAll`,
    });
}

import { downloadFile, getDeviceModelOption, getFactoryModelTreeOption, getFileUrl, getKnowledgeList, getKnowledgeTagOption } from './api';
import useInfiniteQuery2 from '@/hooks/useInfiniteQuery2';
import { useMutation } from '@tanstack/react-query';
import useQuery2 from '@/hooks/useQuery2';

// 获取知识库
export const useKnowledgeList = () => {
    return useInfiniteQuery2({
        delay: 700,
        queryKey: ['knowledge'],
        queryFn: (p) => getKnowledgeList({ ...p.paginationParams, ...p.params }),
        arrayToLast: ['factoryModelId'],
    });
};

// 获取工厂模型【筛选项】【知识库模块】
export const useFactoryModelTreeOption = () => {
    return useQuery2({
        queryKey: ['knowledge-factoryModel'],
        queryFn: () => getFactoryModelTreeOption(),
    });
};

// 获取设备类型【筛选项】【知识库模块】
export const useDeviceModelOption = () => {
    return useQuery2({
        queryKey: ['knowledge-deviceModel'],
        queryFn: () => getDeviceModelOption(),
    });
};

// 获取知识标签【筛选项】
export const useKnowledgeTagOption = () => {
    return useQuery2({
        queryKey: ['knowledge-knowledgeTag'],
        queryFn: () => getKnowledgeTagOption(),
    });
};

// 下载文件
export const useDownloadFile = () => {
    return useMutation({
        mutationKey: ['downloadKnowledgeFile'],
        mutationFn: (md5: string) => downloadFile(md5),
    });
};

// 获取文件url，预览
export const useFileUrl = () => {
    return useMutation({
        mutationKey: ['getKnowledgeFileUrl'],
        mutationFn: (md5: string) => getFileUrl(md5),
        onSuccess: (url) => {
            if (url) window.open(url);
        },
    });
};

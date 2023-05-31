import { getFactoryModelTree, getFactoryModelHomePage } from './api';
import useQuery2 from '@/hooks/useQuery2';

// 获取工厂模型
export const useFactoryModelTree = () => {
    return useQuery2({
        queryKey: ['factoryModel-tree'],
        queryFn: () => getFactoryModelTree(),
    });
};

// 获取工厂模型homepage
export const useFactoryModelHomePage = () => {
    return useQuery2({
        queryKey: ['factoryModel-homePage'],
        queryFn: () => getFactoryModelHomePage(),
    });
};

import { FactoryModelHomePage, FactoryModelListItem } from './type';
import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';

// 获取工厂模型
export const getFactoryModelTree = () => {
    return request.GET<FactoryModelListItem[]>({
        url: `${proxyPrefix.basic}/factoryModel/tree`,
    });
};

// 获取工厂模型homepage
export const getFactoryModelHomePage = () => {
    return request.GET<FactoryModelHomePage>({
        url: `${proxyPrefix.basic}/page-config/page-menu/home-page`,
    });
};

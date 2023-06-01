import { BuildConfigListItem, FactoryModelHomePage, FactoryModelListItem } from './type';
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

// 获取跳转参数，点击跳转前获取
export const getFactoryModelInfo = (factoryModelId: string) => {
    return request.GET<BuildConfigListItem>({
        url: `${proxyPrefix.basic}/page-config/factory-model/${factoryModelId}`,
    });
};

// 订阅mqtt【工厂模型订阅】后获取初始值推送
export const getFactoryMqttInitValue = (data: { type: string; id: string }[]) => {
    return request.POST({
        url: `${proxyPrefix.basic}/realtime/alarm-status-mqtt`,
        data,
    });
};

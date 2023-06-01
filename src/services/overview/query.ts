import { getFactoryModelTree, getFactoryModelHomePage, getFactoryModelInfo, getFactoryMqttInitValue } from './api';
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

// 获取跳转参数，点击跳转前获取
export const useFactoryModelInfo = (id: string) => {
    return useQuery2({
        enabled: !!id,
        queryKey: ['factoryModel-detail', id],
        queryFn: () => getFactoryModelInfo(id),
    });
};

// 订阅mqtt【工厂模型订阅】后获取初始值推送
export const useFactoryMqttInitValue = (data: { type: string; id: string }[]) => {
    return useQuery2({
        enabled: Array.isArray(data) && data.length > 0,
        queryKey: ['factory-mqtt-init-value', data],
        queryFn: () => getFactoryMqttInitValue(data),
    });
};

import proxyPrefix from '@proxy/proxyPrefix';
import { CardInfo, ECS700Detail } from './type';
import request from '@/utils/request';

// 获取ECS700机柜详情
export const getECS700Detail = (cabinetId: string) => {
    return request.POST<ECS700Detail>({
        url: `${proxyPrefix.basic}/room-monitoring/getCabinetDetail/${cabinetId}`,
    });
};

// 获取卡件详情
export const getCardInfo = (cardId: string) => {
    return request.GET<CardInfo[]>({
        url: `${proxyPrefix.basic}/room-monitoring/diagnose/current?cardId=${cardId}`,
    });
};

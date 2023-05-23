import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';
import { ConstValue } from './type';

// 获取 mqtt地址 supos地址 前端地址 关系，支持多app
export const getConstValues = () => {
    return request.GET<ConstValue[]>({
        url: `${proxyPrefix.gateway}/auth/host`,
    });
};

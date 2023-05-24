import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';
import { DeviceDetail } from './type';

// 获取设备详情信息
export const getDeviceDetailInfo = (deviceId: string) => {
    return request.GET<DeviceDetail>({
        url: `${proxyPrefix.basic}/device/device-detail/info/${deviceId}`,
    });
};

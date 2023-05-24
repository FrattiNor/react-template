import { DeviceItem, DeviceListParams, DeviceModelItem, Mfrs } from './type';
import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';
import { ListData } from '@/global';

// 获取设备
export const getDeviceListV2 = ({ view, ...params }: DeviceListParams) => {
    return request.GET<ListData<DeviceItem>>({
        url: `${proxyPrefix.basic}/device/v2/ledger/${view}`,
        params,
    });
};

// 获取设备类型【筛选项】
export const getDeviceModelOption = () => {
    return request.GET<DeviceModelItem[]>({
        url: `${proxyPrefix.basic}/device/deviceModel`,
    });
};

// 获取厂商【筛选项】
export const getDeviceMfrOption = () => {
    return request.GET<Mfrs>({
        url: `${proxyPrefix.basic}/device/mfrs`,
    });
};

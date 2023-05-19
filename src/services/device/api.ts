import { DeviceListItem, DeviceListParams, DeviceModelItem, Mfrs } from './type';
import proxyPrefix from '@proxy/proxyPrefix';
import request from '@/utils/request';
import { ListData } from '@/global';

// 获取设备列表
export const getDeviceListV2 = ({ view, ...params }: DeviceListParams) => {
    return request.GET<ListData<DeviceListItem>>({
        url: `${proxyPrefix.basic}/device/v2/ledger/${view}`,
        params,
    });
};

// 设备类型列表
export const getDeviceModelList = () => {
    return request.GET<DeviceModelItem[]>({
        url: `${proxyPrefix.basic}/device/deviceModel`,
    });
};

// 设备厂商列表
export const getDeviceMfrList = () => {
    return request.GET<Mfrs>({
        url: `${proxyPrefix.basic}/device/mfrs`,
    });
};

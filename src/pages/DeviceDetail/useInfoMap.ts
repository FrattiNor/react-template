import { DeviceDetail } from '@/services/deviceDetail';
import useConst from '@/hooks/useConst';
import notEmpty from '@/utils/notEmpty';

const useInfoMap = (item: DeviceDetail | null | undefined) => {
    const { DEVICE_CATEGORY_MAP } = useConst();

    const { category = 99, deviceTag, deviceModel, deviceRevision, mfrName, protocol, cabinetName } = item || {};

    const infoMapMeter = [
        ['设备位号:', notEmpty(deviceTag), '厂商:', notEmpty(mfrName)],
        ['设备类型:', notEmpty(deviceModel), '类别:', notEmpty(DEVICE_CATEGORY_MAP.get(category))],
        ['设备版本:', notEmpty(deviceRevision), '协议:', notEmpty(protocol)],
    ];

    const infoMapCard = [
        ['机柜名称:', notEmpty(cabinetName), '厂商:', notEmpty(mfrName)],
        ['设备类型:', notEmpty(deviceModel), '类别:', notEmpty(DEVICE_CATEGORY_MAP.get(category))],
    ];

    const infoMap = category < 0 ? infoMapMeter : infoMapCard;

    return infoMap;
};

export default useInfoMap;

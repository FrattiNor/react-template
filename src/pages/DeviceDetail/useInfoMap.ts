import { DeviceDetail } from '@/services/deviceDetail';
import useConst from '@/hooks/useConst';
import notEmpty from '@/utils/notEmpty';

const useInfoMap = (item: DeviceDetail | null | undefined) => {
    const { DEVICE_CATEGORY_MAP } = useConst();

    const { category = 99, deviceTag, deviceModel, deviceRevision, mfrName, protocol, cabinetName } = item || {};

    const infoMapMeter = {
        设备位号: notEmpty(deviceTag),
        设备类型: notEmpty(deviceModel),
        设备版本: notEmpty(deviceRevision),
        厂商: notEmpty(mfrName),
        协议: notEmpty(protocol),
        类别: notEmpty(DEVICE_CATEGORY_MAP.get(category)),
    };

    const infoMapCard = {
        机柜名称: notEmpty(cabinetName),
        设备类型: notEmpty(deviceModel),
        厂商: notEmpty(mfrName),
        类别: notEmpty(DEVICE_CATEGORY_MAP.get(category)),
    };

    const infoMap = category < 0 ? infoMapMeter : infoMapCard;

    return infoMap;
};

export default useInfoMap;

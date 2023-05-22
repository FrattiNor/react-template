import { useDeviceMfrList, useDeviceModelList } from '@/services/device/query';
import { createFilterItem } from '@/components/InfiniteList/utils';
import { useConst } from '@/hooks';

const useFilters = () => {
    const { DEVICE_ORIGIN_MAP, DEVICE_DEV_MODE } = useConst();

    return [
        createFilterItem({
            label: 'ISDM位号',
            name: 'isdmTag',
            type: 'input',
        }),
        createFilterItem({
            label: '设备来源',
            type: 'block-select',
            multiple: true,
            columns: 2,
            name: 'sourceType',
            option: Array.from(DEVICE_ORIGIN_MAP).map(([value, label]) => ({ value, label })),
        }),
        createFilterItem({
            label: '模式状态',
            type: 'block-select',
            multiple: true,
            columns: 4,
            name: 'devMode',
            option: Array.from(DEVICE_DEV_MODE).map(([value, label]) => ({ value, label })),
        }),
        createFilterItem({
            label: '厂商',
            type: 'select',
            multiple: true,
            name: 'mfrName',
            option: useDeviceMfrList,
            fieldKeys: 'isStringArray',
        }),
        createFilterItem({
            label: '设备类型',
            type: 'select',
            multiple: true,
            name: 'mfrAndDevice',
            option: useDeviceModelList,
            fieldKeys: {
                value: 'mfrAndDevice',
                label: 'deviceModelView',
            },
        }),
    ];
};

export default useFilters;

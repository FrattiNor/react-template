import { createFilterItem } from '@/components/InfiniteList/utils';
import { useConst } from '@/hooks';
import { useAreaList } from '@/services/alarm';

const useFilters = () => {
    const { ALARM_STATUS_MAP, ALARM_LEVEL_MAP } = useConst();

    return [
        createFilterItem({
            label: '报警事件描述',
            name: 'alarmName',
            type: 'input',
        }),
        createFilterItem({
            label: '设备类型',
            name: 'deviceModel',
            type: 'input',
        }),
        createFilterItem({
            label: '报警等级',
            name: 'alarmLevel',
            type: 'block-select',
            multiple: true,
            columns: 2,
            option: Array.from(ALARM_LEVEL_MAP).map(([value, label]) => ({ value, label })),
        }),
        createFilterItem({
            label: '报警状态',
            name: 'alarmStatus',
            type: 'block-select',
            multiple: true,
            columns: 2,
            option: Array.from(ALARM_STATUS_MAP).map(([value, label]) => ({ value, label })),
        }),
        createFilterItem({
            label: '装置',
            name: 'areaId',
            type: 'select',
            multiple: true,
            option: useAreaList,
            fieldKeys: {
                value: 'id',
                label: 'areaName',
            },
        }),
        createFilterItem({
            label: ['结开始时间', '结束时间'],
            name: ['startTime', 'endTime'],
            type: 'rang-picker',
            precision: 'minute',
        }),
    ];
};

export default useFilters;

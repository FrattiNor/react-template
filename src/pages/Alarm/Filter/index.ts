import createFilterItem from '@/components/Filter/utils/createFilterItem';
import { useAreaOption } from '@/services/alarm';
import useConst from '@/hooks/useConst';
import { useMemo } from 'react';

const useFilter = ({ deviceId, factoryModelId }: { deviceId?: string; factoryModelId?: string }) => {
    const { ALARM_STATUS_MAP, ALARM_LEVEL_MAP } = useConst();

    const historyFilter = useMemo(() => {
        let filter = [
            createFilterItem({
                label: '报警事件',
                name: 'alarmName',
                type: 'input',
            }),
            createFilterItem({
                label: '设备类型',
                name: 'deviceModel',
                type: 'input',
            }),
            createFilterItem({
                label: 'ISDM位号',
                name: 'tagName',
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
                option: useAreaOption,
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
        if (deviceId) filter = filter.filter((item) => item.label !== '装置' && item.label !== 'ISDM位号');
        if (factoryModelId) filter = filter.filter((item) => item.label !== '装置');
        return filter;
    }, []);

    const realtimeFilter = useMemo(() => {
        let filter = [
            createFilterItem({
                label: 'ISDM位号',
                name: 'tagName',
                type: 'input',
            }),
            createFilterItem({
                label: '报警等级',
                name: 'alarmType',
                type: 'block-select',
                multiple: true,
                columns: 2,
                option: Array.from(ALARM_LEVEL_MAP).map(([value, label]) => ({ value, label })),
            }),
            createFilterItem({
                label: '装置',
                name: 'areaId',
                type: 'select',
                multiple: true,
                option: useAreaOption,
                fieldKeys: {
                    value: 'id',
                    label: 'areaName',
                },
            }),
        ];
        if (deviceId) filter = filter.filter((item) => item.label !== '装置' && item.label !== 'ISDM位号');
        if (factoryModelId) filter = filter.filter((item) => item.label !== '装置');
        return filter;
    }, []);

    return { historyFilter, realtimeFilter };
};

export default useFilter;

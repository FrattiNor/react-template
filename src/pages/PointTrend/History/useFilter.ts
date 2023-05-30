import createFilterItem from '@/components/Filter/utils/createFilterItem';
import { useMemo } from 'react';

const useFilter = () => {
    return useMemo(
        () => [
            createFilterItem({
                type: 'rang-picker',
                name: ['startTime', 'endTime'],
                label: ['开始时间', '结束时间'],
                precision: 'minute',
            }),
            createFilterItem({
                type: 'input',
                name: 'fullPointTags',
                label: '位号',
                array: true,
            }),
        ],
        [],
    );
};

export default useFilter;

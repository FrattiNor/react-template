import createFilterItem from '@/components/Filter/utils/createFilterItem';
import { useMemo } from 'react';

export const useFilter = () => {
    return useMemo(
        () => [
            createFilterItem({
                type: 'range-picker',
                name: ['startTime', 'endTime'],
                label: ['开始时间', '结束时间'],
            }),
        ],
        [],
    );
};

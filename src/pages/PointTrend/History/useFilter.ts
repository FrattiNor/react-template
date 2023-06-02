import createFilterItem from '@/components/Filter/utils/createFilterItem';
import { useSearchPointList } from '@/services/pointTrend';
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
                type: 'search-select',
                name: 'fullPointTags',
                option: useSearchPointList,
                multiple: true,
                label: '位号',
                max: 5,
                fieldKeys: {
                    value: 'fullPointTag',
                },
            }),
        ],
        [],
    );
};

export default useFilter;

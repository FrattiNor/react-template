import createFilterItem from '@/components/Filter/utils/createFilterItem';
import { useSearchPointList } from '@/services/pointTrend';
import { useMemo } from 'react';

const useFilter = () => {
    return useMemo(
        () => [
            createFilterItem({
                type: 'range-picker',
                name: ['startTime', 'endTime'],
                label: ['开始时间', '结束时间'],
                range: 1000 * 60 * 60 * 24 * 90, // 90天
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

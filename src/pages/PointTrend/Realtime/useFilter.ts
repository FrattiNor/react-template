import createFilterItem from '@/components/Filter/utils/createFilterItem';
import { useSearchPointList } from '@/services/pointTrend';
import { useMemo } from 'react';

const useFilter = () => {
    return useMemo(
        () => [
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

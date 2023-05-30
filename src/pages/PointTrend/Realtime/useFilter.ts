import createFilterItem from '@/components/Filter/utils/createFilterItem';
import { useMemo } from 'react';

const useFilter = () => {
    return useMemo(
        () => [
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

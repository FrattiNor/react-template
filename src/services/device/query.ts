import { useQuery } from '@tanstack/react-query';
import { getDeviceListV2 } from '.';
import { useState } from 'react';
import { Pagination } from '@/global';

export const useDeviceList = () => {
    const [params, setParams] = useState<Record<string, string>>({});
    const [paginationParams, setPaginationParams] = useState<Pagination>({ current: 1, pageSize: 0 });

    const query = useQuery({
        keepPreviousData: true,
        queryKey: ['device', params, paginationParams],
        queryFn: () => getDeviceListV2({ view: 0, ...params, ...paginationParams }),
    });

    const list = query.data?.list;
    const pagination = query.data?.pagination;

    return [
        { list, pagination },
        { setParams, setPaginationParams, ...query },
    ];
};

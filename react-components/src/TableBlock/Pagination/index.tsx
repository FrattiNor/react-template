import type { FC } from 'react';

import Pagination from '../../Pagination';

import type { Pagination as PaginationType } from '../hooks/usePagination';

type Props = {
    isEmpty: boolean;
    pagination: PaginationType;
};

const TablePagination: FC<Props> = ({ isEmpty, pagination }) => {
    if (pagination === undefined || isEmpty) {
        return null;
    }

    return <Pagination {...pagination} wrapperStyle={{ paddingTop: 12 }} />;
};

export default TablePagination;

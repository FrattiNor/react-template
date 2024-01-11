import { HandledProps } from '../useHandleProps';
import { Pagination } from '../usePagination';
import { useTranslation } from '@pkg/i18n';
import { TableColumns } from '../../type';

type Opt<T> = {
    pagination: Pagination;
    handledProps: HandledProps<T>;
};

const useIndexColumns = <T>(opt: Opt<T>) => {
    const { t1 } = useTranslation();
    const { handledProps, pagination } = opt;
    const { showIndex } = handledProps;
    const current = !pagination ? 1 : pagination?.current;
    const pageSize = !pagination ? 10 : pagination?.pageSize;

    const indexColumns: TableColumns<any> = [];

    if (showIndex) {
        indexColumns.push({
            flexGrow: 0,
            key: 'index',
            title: t1('序号'),
            render: (_, index) => (current - 1) * pageSize + index + 1,
            width: typeof showIndex !== 'boolean' ? showIndex?.width ?? 60 : 60,
            fixed: typeof showIndex !== 'boolean' ? showIndex?.fixed ?? 'left' : 'left',
            align: typeof showIndex !== 'boolean' ? showIndex?.align ?? 'center' : 'center',
        });
    }

    return indexColumns;
};

export default useIndexColumns;

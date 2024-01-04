import { useEffect, useMemo, useState } from 'react';
import { HandledProps } from '../useHandleProps';
import { TableColumns } from '../../type';
import { useTranslation } from '@pkg/i18n';

type Opt<T> = {
    handledProps: HandledProps<T>;
};

const usePagination = <T>(opt: Opt<T>) => {
    const { handledProps } = opt;
    const { t1 } = useTranslation();
    const [_current, _setCurrent] = useState(1);
    const [_pageSize, _setPageSize] = useState(10);
    const _onChange = (c: number, p: number) => {
        _setCurrent(c);
        _setPageSize(p);
    };

    const { pagination, dataSource, showIndex } = handledProps;
    const havePagination = !!pagination;
    const dataSourceLength = (dataSource || []).length;
    const total = typeof pagination !== 'boolean' ? pagination?.total ?? dataSourceLength : dataSourceLength;
    const current = !pagination ? 1 : typeof pagination !== 'boolean' ? pagination?.current ?? _current : _current;
    const pageSize = typeof pagination !== 'boolean' ? pagination?.pageSize ?? _pageSize : _pageSize;
    const onChange = typeof pagination !== 'boolean' ? pagination?.onChange ?? _onChange : _onChange;

    // 数据源变更回到第一页
    useEffect(() => {
        _setCurrent(1);
    }, [dataSource]);

    const sizedDataSource = useMemo(() => {
        if (pagination) {
            if (typeof pagination !== 'boolean' && typeof pagination?.total === 'number') {
                return dataSource || [];
            } else {
                return (dataSource || []).slice(pageSize * (current - 1), pageSize * current);
            }
        }

        return dataSource || [];
    }, [dataSource, current, pageSize, havePagination]);

    const handledPagination = pagination
        ? {
              ...(typeof pagination !== 'boolean' ? pagination : {}),
              total,
              current,
              pageSize,
              onChange,
          }
        : (false as const);

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

    return {
        indexColumns,
        sizedDataSource,
        pagination: handledPagination,
    };
};

export default usePagination;

import type { ReactNode } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import classNames from 'classnames';

import Body from './Body';
import useDataSource from './hooks/useDataSource';
import usePagination from './hooks/usePagination';
import useVirtual from './hooks/useVirtual';
import styles from './index.module.less';
import Pagination from './Pagination';
import LoadingDiv from '../LoadingDiv';

import type { TableBlockProps, TableBlockRef } from './type';

type ComponentType = <T>(props: TableBlockProps<T> & React.RefAttributes<TableBlockRef>) => ReactNode | null;

const TableBlock: ComponentType = forwardRef((props, ref) => {
    const { className, style } = props;
    const pagination = usePagination(props);
    const bodyRef = useRef<HTMLDivElement>(null);
    const dataSource = useDataSource({ props, pagination });
    const virtual = useVirtual({ props, dataSource, bodyRef });
    const isEmpty = dataSource.length === 0;

    useImperativeHandle(
        ref,
        () => ({
            scrollTo: (options: { left?: number; top?: number; behavior?: 'auto' | 'instant' | 'smooth' }) => {
                if (bodyRef.current) bodyRef.current.scrollTo(options);
            },
        }),
        [],
    );

    return (
        <LoadingDiv loading={props.loading} className={classNames(styles['table-block'], className)} style={style}>
            <Body bodyRef={bodyRef} virtual={virtual} dataSource={dataSource} props={props} isEmpty={isEmpty} />
            <Pagination pagination={pagination} isEmpty={isEmpty} />
        </LoadingDiv>
    );
});

export default TableBlock;

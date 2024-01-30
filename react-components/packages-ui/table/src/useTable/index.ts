import { useRef } from 'react';

import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcPing from './useCalcPing';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useChangeScrollTop from './useChangeScrollTop';
import useClickedRow from './useClickedRow';
import useEditStore from './useEditStore';
import useExpandable from './useExpandable';
import useHandleColumns from './useHandleColumns';
import useHandleProps from './useHandleProps';
import useIndexColumns from './useIndexColumns';
import usePagination from './usePagination';
import usePaginationDatasource from './usePaginationDatasource';
import useResizeWidth from './useResizeWidth';
import useRowSelection from './useRowSelection';
import useSortConfColumns from './useSortConfColumns';
import useVirtual from './useVirtual';
import { AnyObj, TableProps } from '../type';

export const defaultWidth = 150;
export const defaultFlexGrow = 1;
export const defaultLineHeight = 36;
export const defaultAutoScrollTop = false;

const useTable = <T extends AnyObj>(props: TableProps<T>) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // 给了默认值的props
    const handledProps = useHandleProps(props);

    // 空
    const isEmpty = (handledProps.dataSource || [])?.length === 0;

    // 分页
    const pagination = usePagination({ handledProps });

    // 分页后的数据源
    const paginationDatasource = usePaginationDatasource({
        pagination,
        handledProps,
    });

    // 序号列
    const indexColumns = useIndexColumns({
        pagination,
        handledProps,
    });

    // 数据源变更回滚顶部
    useChangeScrollTop({
        bodyRef,
        handledProps,
        paginationDatasource,
    });

    // 增加展开
    const expandable = useExpandable({
        handledProps,
        paginationDatasource,
    });

    // 增加多选
    const rowSelection = useRowSelection({
        handledProps,
        totalDataSource: expandable.totalDataSource,
    });

    //  整合后排序的 columns
    const sortConfColumns = useSortConfColumns({
        indexColumns,
        columns: handledProps.columns,
        expandableColumns: expandable.expandableColumns,
        rowSelectionColumns: rowSelection.rowSelectionColumns,
    });

    // ping
    const { calcPing, ping } = useCalcPing({ bodyRef });

    // v scrollbar
    const { calcScrollBarWidth, vScrollBarWidth } = useCalcScrollBarWidth({ bodyRef });

    //  body resize observer
    const bodyResizeObserver = useBodyResizeObserver({
        bodyRef,
        calcPing,
        calcScrollBarWidth,
    });

    // body scroll observer
    const bodyScrollObserver = useBodyScrollObserver({
        bodyRef,
        headRef,
        calcPing,
    });

    // 编辑格缓存
    const editStore = useEditStore({
        bodyScrollObserver,
        paginationDatasource,
    });

    // virtual table core
    const virtual = useVirtual({
        bodyRef,
        handledProps,
        bodyScrollObserver,
        bodyResizeObserver,
        showDataSource: expandable.showDataSource,
        sortedColumns: sortConfColumns.sortedColumns,
    });

    //  title resize
    const resizeWidth = useResizeWidth({
        virtual,
        handledProps,
        sortedColumns: sortConfColumns.sortedColumns,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        virtual,
        resizeWidth,
        sortedColumns: sortConfColumns.sortedColumns,
    });

    const clickedRow = useClickedRow();

    return {
        ping,
        bodyRef,
        headRef,
        isEmpty,
        pagination,
        indexColumns,
        vScrollBarWidth,
        ...virtual,
        ...editStore,
        ...expandable,
        ...clickedRow,
        ...resizeWidth,
        ...rowSelection,
        ...handledColumns,
        ...sortConfColumns,
        props: handledProps,
    };
};

export default useTable;

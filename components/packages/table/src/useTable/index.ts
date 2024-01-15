import usePaginationDatasource from './usePaginationDatasource';
import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useSortConfColumns from './useSortConfColumns';
import useChangeScrollTop from './useChangeScrollTop';
import useHandleColumns from './useHandleColumns';
import useIndexColumns from './useIndexColumns';
import useRowSelection from './useRowSelection';
import useResizeWidth from './useResizeWidth';
import useHandleProps from './useHandleProps';
import { AnyObj, TableProps } from '../type';
import usePagination from './usePagination';
import useExpandable from './useExpandable';
import useClickedRow from './useClickedRow';
import useEditStore from './useEditStore';
import useTimeDebug from './useTimeDebug';
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';
import { useRef } from 'react';

export const defaultWidth = 150;
export const defaultFlexGrow = 1;
export const defaultLineHeight = 36;
export const defaultAutoScrollTop = false;

const useTable = <T extends AnyObj>(props: TableProps<T>) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // 给了默认值的props
    const handledProps = useHandleProps(props);

    //
    const timeDebug = useTimeDebug({ handledProps });

    // 空
    const isEmpty = (handledProps.dataSource || [])?.length === 0;

    // 分页
    const pagination = usePagination({ handledProps, timeDebug });

    // 分页后的数据源
    const paginationDatasource = usePaginationDatasource({
        timeDebug,
        pagination,
        handledProps,
    });

    // 序号列
    const indexColumns = useIndexColumns({
        timeDebug,
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
        timeDebug,
        handledProps,
        paginationDatasource,
    });

    // 增加多选
    const rowSelection = useRowSelection({
        timeDebug,
        handledProps,
        totalDataSource: expandable.totalDataSource,
    });

    //  整合后排序的 columns
    const sortConfColumns = useSortConfColumns({
        timeDebug,
        indexColumns,
        columns: handledProps.columns,
        expandableColumns: expandable.expandableColumns,
        rowSelectionColumns: rowSelection.rowSelectionColumns,
    });

    //  title resize
    const resizeWidth = useResizeWidth({ handledProps });

    // ping
    const { calcPing, ping } = useCalcPing({ timeDebug, bodyRef });

    // v scrollbar
    const { calcScrollBarWidth, vScrollBarWidth } = useCalcScrollBarWidth({ timeDebug, bodyRef });

    //  body resize observer
    const bodyResizeObserver = useBodyResizeObserver({
        timeDebug,
        bodyRef,
        calcPing,
        calcScrollBarWidth,
    });

    // body scroll observer
    const bodyScrollObserver = useBodyScrollObserver({
        timeDebug,
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
        timeDebug,
        bodyRef,
        handledProps,
        bodyScrollObserver,
        bodyResizeObserver,
        showDataSource: expandable.showDataSource,
        sortedColumns: sortConfColumns.sortedColumns,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        timeDebug,
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

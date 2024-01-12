import usePaginationDatasource from './usePaginationDatasource';
import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import { useTableDataContext } from '../TableDataContext';
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
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';
import { useRef } from 'react';

export const defaultWidth = 150;
export const defaultFlexGrow = 1;
export const defaultLineHeight = 36;
export const defaultAutoScrollTop = false;

const useTable = <T extends AnyObj>(props: TableProps<T>) => {
    const dataContext = useTableDataContext();
    const _bodyRef = useRef<HTMLDivElement>(null);
    const _headRef = useRef<HTMLDivElement>(null);
    const bodyRef = dataContext?.bodyRef ?? _bodyRef;
    const headRef = dataContext?.headRef ?? _headRef;

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

    //  title resize
    const resizeWidth = useResizeWidth({ handledProps });

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

import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import { useTableDataContext } from '../TableDataContext';
import useSortConfColumns from './useSortConfColumns';
import useChangeScrollTop from './useChangeScrollTop';
import useHandleColumns from './useHandleColumns';
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
export const defaultAutoScrollTop = true;

const useTable = <T extends AnyObj>(props: TableProps<T>) => {
    const dataContext = useTableDataContext();
    const _bodyRef = useRef<HTMLDivElement>(null);
    const _headRef = useRef<HTMLDivElement>(null);
    const bodyRef = dataContext?.bodyRef ?? _bodyRef;
    const headRef = dataContext?.headRef ?? _headRef;

    // props and auto scrollTop
    const { handledProps, isEmpty } = useHandleProps(props);

    // 分页
    const { pagination, sizedDataSource, indexColumns } = usePagination({ handledProps });

    // 数据源变更回滚顶部
    useChangeScrollTop({ bodyRef, handledProps, sizedDataSource });

    // 增加展开
    const { totalDataSource, showDataSource, dataSourceLevelMap, expandableColumns } = useExpandable({ handledProps, sizedDataSource });

    // 增加多选
    const { selectedRowKeysObj, rowSelectionColumns } = useRowSelection({ handledProps, totalDataSource });

    //  整合后排序的 columns
    const { sortedColumns, columnsConf, setColumnsConf } = useSortConfColumns({
        indexColumns,
        expandableColumns,
        rowSelectionColumns,
        columns: handledProps.columns,
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
    const editStore = useEditStore({ sizedDataSource, bodyScrollObserver });

    // virtual table core
    const virtual = useVirtual({
        bodyRef,
        handledProps,
        sortedColumns,
        showDataSource,
        bodyResizeObserver,
        bodyScrollObserver,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        virtual,
        resizeWidth,
        sortedColumns,
    });

    const clickedRow = useClickedRow();

    const innerProps = {
        ...virtual,
        ...editStore,
        ...clickedRow,
        ...resizeWidth,
        ...handledColumns,

        ping,
        isEmpty,
        pagination,
        columnsConf,
        indexColumns,
        showDataSource,
        vScrollBarWidth,
        selectedRowKeysObj,
        dataSourceLevelMap,
        setColumnsConf,
    };

    const outerProps = handledProps;

    return {
        bodyRef,
        headRef,
        outerProps,
        innerProps,
    };
};

export default useTable;

import { useRef } from 'react';

import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcPing from './useCalcPing';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useClearRowSelectionAndExpandable from './useClearRowSelectionAndExpandable';
import useClickedRow from './useClickedRow';
import useDataSource from './useDataSource';
import useEditStore from './useEditStore';
import useExpandable from './useExpandable';
import useHandleColumns from './useHandleColumns';
import useHandleProps from './useHandleProps';
import usePagination from './usePagination';
import useResizeWidth from './useResizeWidth';
import useRowSelection from './useRowSelection';
import useSortConfColumns from './useSortConfColumns';
import useVirtual from './useVirtual';
import type { AnyObj, TableProps } from '../type';

export const defaultWidth = 150;
export const defaultFlexGrow = 1;
export const defaultLineHeight = 40;
export const defaultAutoScrollTop = false;

const useTable = <T extends AnyObj>(_props: TableProps<T>) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // row 点击高亮
    const clickedRow = useClickedRow();

    //  body resize 监听
    const bodyResizeObserver = useBodyResizeObserver(bodyRef);

    // body scroll 监听
    const bodyScrollObserver = useBodyScrollObserver({ bodyRef, headRef });

    // 处理 props
    const handledProps = useHandleProps(_props);

    // 判断 dataSource 为空
    const isEmpty = !(Array.isArray(handledProps.dataSource) && handledProps.dataSource.length > 0);

    // 分页
    const pagination = usePagination(handledProps);

    // 展开
    const expandable = useExpandable(handledProps);

    // 数据源
    const dataSource = useDataSource({ handledProps, pagination, expandable, bodyRef });

    // 多选
    const rowSelection = useRowSelection({ handledProps, dataSource });

    // 根据 dataSource 清除多选和展开
    useClearRowSelectionAndExpandable({ rowSelection, expandable, dataSource, handledProps });

    //  整合后排序的 columns
    const sortedColumns = useSortConfColumns<T>({ columns: handledProps.columns, rowSelection, expandable });

    // ping
    const ping = useCalcPing({ bodyRef, bodyResizeObserver, bodyScrollObserver });

    // v scrollbar
    const vScrollBarWidth = useCalcScrollBarWidth({ bodyRef, bodyResizeObserver });

    // 编辑格缓存
    const editStore = useEditStore({ dataSource });

    // virtual table core
    const virtual = useVirtual<T>({
        bodyRef,
        dataSource,
        handledProps,
        sortedColumns,
        bodyScrollObserver,
        bodyResizeObserver,
    });

    //  title resize
    const resizeWidth = useResizeWidth({
        virtual,
        handledProps,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        virtual,
        resizeWidth,
        sortedColumns,
    });

    return {
        ping,
        bodyRef,
        headRef,
        isEmpty,
        editStore,
        pagination,
        handledProps,
        sortedColumns,
        vScrollBarWidth,
        ...virtual,
        ...editStore,
        ...expandable,
        ...dataSource,
        ...clickedRow,
        ...resizeWidth,
        ...rowSelection,
        ...handledColumns,
    };
};

export default useTable;

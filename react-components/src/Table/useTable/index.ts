import { useRef } from 'react';

import useBodyObserver from './useBodyObserver';
import useClearRowSelectionAndExpandable from './useClearRowSelectionAndExpandable';
import useColumnsGridSizeAndSticky from './useColumnsGridSizeAndSticky';
import useConformity from './useConformity';
import useDataSource from './useDataSource';
import useEditStore from './useEditStore';
import useExpandable from './useExpandable';
import useHandleColumnsObj from './useHandleColumnsObj';
import useHandleProps from './useHandleProps';
import usePagination from './usePagination';
import useResizeWidth from './useResizeWidth';
import useRowClickStore from './useRowClickStore';
import useRowSelection from './useRowSelection';
import useVirtual from './useVirtual';

import type { AnyObj, TableProps } from '../type';

export const defaultWidth = 150;
export const defaultFlexGrow = 1;
export const defaultLineHeight = 39;

const useTable = <T extends AnyObj>(_props: TableProps<T>) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    // row 点击高亮
    const rowClickStore = useRowClickStore();

    // 内部使用 处理过的props
    const handledProps = useHandleProps<T>(_props);

    //  body resize onscroll 监听
    const bodyObserver = useBodyObserver({ bodyRef, headRef, summaryRef });

    // 分页
    const pagination = usePagination<T>(handledProps);

    // 展开
    const expandable = useExpandable<T>(handledProps);

    // 数据源
    const dataSource = useDataSource<T>({ handledProps, pagination, expandable });

    // 多选
    const rowSelection = useRowSelection<T>({ handledProps, dataSource });

    // 根据 dataSource 清除多选和展开
    useClearRowSelectionAndExpandable<T>({ rowSelection, expandable, dataSource, handledProps });

    // 编辑格缓存
    const editStore = useEditStore<T>({ dataSource });

    // handle columns
    const handledColumnsObj = useHandleColumnsObj<T>({
        dataSource,
        expandable,
        handledProps,
        rowSelection,
    });

    // virtual table core
    const virtual = useVirtual<T>({
        bodyRef,
        dataSource,
        handledProps,
        bodyObserver,
        handledColumnsObj,
    });

    //  title resize
    const resizeWidth = useResizeWidth<T>({
        virtual,
        handledProps,
        handledColumnsObj,
    });

    const columnsGridSizeAndSticky = useColumnsGridSizeAndSticky({
        virtual,
        resizeWidth,
        bodyObserver,
        handledColumnsObj,
    });

    return useConformity<T>({
        bodyRef,
        headRef,
        summaryRef,
        handledProps,
        bodyObserver,
        pagination,
        expandable,
        dataSource,
        rowSelection,
        editStore,
        resizeWidth,
        rowClickStore,
        virtual,
        handledColumnsObj,
        columnsGridSizeAndSticky,
    });
};

export default useTable;

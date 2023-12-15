import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useChangeScrollTop from './useChangeScrollTop';
import useHandleColumns from './useHandleColumns';
import useRowSelection from './useRowSelection';
import useSortColumns from './useSortColumns';
import useHandleProps from './useHandleProps';
import useResizeWidth from './useResizeWidth';
import { AnyObj, TableProps } from '../type';
import useExpandable from './useExpandable';
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';
import { useRef } from 'react';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // props
    const { columns, dataSource, newProps } = useHandleProps(props);
    const { rowKey, rowSelection, autoScrollTop, rowHeight, expandable } = newProps;

    // auto scroll top
    useChangeScrollTop({ dataSource, autoScrollTop, bodyRef });

    // 增加展开
    const { totalDataSource, showDataSource, expandableColumns } = useExpandable({ rowKey, expandable, dataSource });

    // 增加多选
    const { selectedRowKeysObj, rowSelectionColumns } = useRowSelection({ rowKey, rowSelection, dataSource: totalDataSource });

    // 整合后的 columns
    const totalColumns = useSortColumns([...rowSelectionColumns, ...expandableColumns, ...columns]);

    // title resize
    const resizeWidth = useResizeWidth();

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

    // virtual table core
    const virtual = useVirtual({
        rowKey,
        bodyRef,
        rowHeight,
        defaultWidth,
        totalColumns,
        bodyResizeObserver,
        bodyScrollObserver,
        dataSource: showDataSource,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        ping,
        resizeWidth,
        defaultWidth,
        totalColumns,
        defaultFlexGrow,
        vScrollBarWidth,
        horizontalRange: virtual.horizontalRange,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
    });

    const innerProps = {
        ...virtual,
        ...resizeWidth,
        ...handledColumns,
        showDataSource,
        vScrollBarWidth,
        selectedRowKeysObj,
    };

    return {
        bodyRef,
        headRef,
        newProps,
        innerProps,
    };
};

export default useData;

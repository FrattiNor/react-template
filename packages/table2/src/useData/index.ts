import useVirtualScrollHandler from './useVirtualScrollHandler';
import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useHiddenFixedColumns from './useHiddenFixedColumns';
import useChangeScrollTop from './useChangeScrollTop';
import useCalcScrollBar from './useCalcScrollBar';
import useHandleColumns from './useHandleColumns';
import useHandleProps from './useHandleProps';
import useResizeWidth from './useResizeWidth';
import useSortColumns from './useSortColumns';
import { AnyObj, TableProps } from '../type';
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';
import { useRef } from 'react';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const vScrollbarRef = useRef<HTMLDivElement>(null);
    const hScrollbarRef = useRef<HTMLDivElement>(null);

    // props
    const { columns, rowKey, dataSource, autoScrollTop, newProps } = useHandleProps(props);
    // auto scroll top
    useChangeScrollTop({ dataSource, autoScrollTop, bodyRef });
    // ping
    const calcPing = useCalcPing();
    // title resize
    const resizeWidth = useResizeWidth();
    // sort columns
    const sortedColumns = useSortColumns({ columns });
    // virtual bar scroll
    const virtualScrollHandler = useVirtualScrollHandler({ bodyRef, headRef });
    //  body resize observer
    const bodyResizeObserver = useBodyResizeObserver({ bodyRef, calcPing });
    // body scroll observer
    const bodyScrollObserver = useBodyScrollObserver({
        bodyRef,
        headRef,
        calcPing,
        vScrollbarRef,
        hScrollbarRef,
    });
    // virtual table core
    const virtual = useVirtual({
        rowKey,
        bodyRef,
        dataSource,
        defaultWidth,
        sortedColumns,
        bodyResizeObserver,
        bodyScrollObserver,
    });
    // calc scroll bar
    const calcScrollBar = useCalcScrollBar({
        virtual,
        resizeWidth,
        defaultWidth,
        sortedColumns,
        bodyResizeObserver,
    });
    // handle columns
    const handledColumns = useHandleColumns({
        defaultWidth,
        calcScrollBar,
        sortedColumns,
        defaultFlexGrow,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
    });
    // calc hidden fixed columns
    const hiddenFixedColumns = useHiddenFixedColumns({
        handledColumns,
        horizontalRange: virtual.horizontalRange,
    });

    const { ping } = calcPing;

    const _columns = {
        handledColumns: handledColumns.columns,
        hiddenFixedTotalSize: hiddenFixedColumns.hiddenFixedTotalSize,
        hiddenFixedHandledLeftColumns: hiddenFixedColumns.hiddenFixedHandledLeftColumns,
        hiddenFixedHandledRightColumns: hiddenFixedColumns.hiddenFixedHandledRightColumns,
    };

    return {
        bodyRef,
        headRef,
        vScrollbarRef,
        hScrollbarRef,

        ping,
        virtual,
        newProps,
        resizeWidth,
        calcScrollBar,
        columns: _columns,
        virtualScrollHandler,
    };
};

export default useData;

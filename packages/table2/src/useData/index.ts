import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useVirtualScrollHandler from './useVirtualScrollHandler';
import useHiddenFixedColumns from './useHiddenFixedColumns';
import useCalcScrollBar from './useCalcScrollBar';
import useHandleColumns from './useHandleColumns';
import useHandleProps from './useHandleProps';
import useResizeWidth from './useResizeWidth';
import useSortColumns from './useSortColumns';
import { AnyObj, TableProps } from '../type';
import { useEffect, useRef } from 'react';
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const vScrollbarRef = useRef<HTMLDivElement>(null);
    const hScrollbarRef = useRef<HTMLDivElement>(null);

    // props
    const { columns, rowKey, dataSource, autoScrollTop, newProps } = useHandleProps(props);
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

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (autoScrollTop === undefined || autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [dataSource]);

    return {
        calcPing,
        resizeWidth,
        virtual,
        bodyRef,
        headRef,
        newProps,
        vScrollbarRef,
        hScrollbarRef,
        hiddenFixedColumns,
        calcScrollBar,
        handledColumns,
        virtualScrollHandler,
    };
};

export default useData;

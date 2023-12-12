import useCalcPingAndScrollBarWidth from './useCalcPingAndScrollBarWidth';
import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useHiddenFixedColumns from './useHiddenFixedColumns';
import useChangeScrollTop from './useChangeScrollTop';

import useHandleColumns from './useHandleColumns';
import useHandleProps from './useHandleProps';
import useResizeWidth from './useResizeWidth';
import useSortColumns from './useSortColumns';
import { AnyObj, TableProps } from '../type';
import useVirtual from './useVirtual';
import { useRef } from 'react';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // props
    const { columns, rowKey, dataSource, autoScrollTop, newProps } = useHandleProps(props);
    // auto scroll top
    useChangeScrollTop({ dataSource, autoScrollTop, bodyRef });
    // title resize
    const resizeWidth = useResizeWidth();
    // ping
    const calcPingAndScrollBarWidth = useCalcPingAndScrollBarWidth();
    // sort columns
    const sortedColumns = useSortColumns({ columns });
    //  body resize observer
    const bodyResizeObserver = useBodyResizeObserver({
        bodyRef,
        calcPingAndScrollBarWidth,
    });
    // body scroll observer
    const bodyScrollObserver = useBodyScrollObserver({
        bodyRef,
        headRef,
        calcPingAndScrollBarWidth,
    });
    // virtual table core
    const virtual = useVirtual({
        rowKey,
        bodyRef,
        dataSource,
        resizeWidth,
        defaultWidth,
        sortedColumns,
        bodyResizeObserver,
        bodyScrollObserver,
    });
    // handle columns
    const handledColumns = useHandleColumns({
        defaultWidth,
        sortedColumns,
        defaultFlexGrow,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
        vScrollBarWidth: calcPingAndScrollBarWidth.vScrollBarWidth,
    });
    // calc hidden fixed columns
    const hiddenFixedColumns = useHiddenFixedColumns({
        handledColumns,
        horizontalRange: virtual.horizontalRange,
    });

    const innerProps = {
        ...resizeWidth,
        ...hiddenFixedColumns,
        ping: calcPingAndScrollBarWidth.ping,
        handledColumns: handledColumns.columns,
        vScrollBarWidth: calcPingAndScrollBarWidth.vScrollBarWidth,
    };

    return {
        bodyRef,
        headRef,

        virtual,
        newProps,
        innerProps,
    };
};

export default useData;

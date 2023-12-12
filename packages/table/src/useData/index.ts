import useCalcPingAndScrollBarWidth from './useCalcPingAndScrollBarWidth';
import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useHiddenFixedColumns from './useHiddenFixedColumns';
import useChangeScrollTop from './useChangeScrollTop';
import useHandleColumns from './useHandleColumns';
import useRowSelection from './useRowSelection';
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
    const { columns, newProps } = useHandleProps(props);
    const { rowKey, dataSource, autoScrollTop, rowSelection } = newProps;
    // 增加多选
    const { rowKeysObj, rowSelectionColumns } = useRowSelection({ columns, rowKey, dataSource, rowSelection });
    // auto scroll top
    useChangeScrollTop({ dataSource, autoScrollTop, bodyRef });
    // title resize
    const resizeWidth = useResizeWidth();
    // ping
    const calcPingAndScrollBarWidth = useCalcPingAndScrollBarWidth({ bodyRef });
    // sort columns
    const sortedColumns = useSortColumns({ columns: rowSelectionColumns });
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
        defaultWidth,
        sortedColumns,
        bodyResizeObserver,
        bodyScrollObserver,
        calcPingAndScrollBarWidth,
        resized: resizeWidth.resized,
    });
    // handle columns
    const handledColumns = useHandleColumns({
        defaultWidth,
        sortedColumns,
        defaultFlexGrow,
        resized: resizeWidth.resized,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
        vScrollBarWidth: calcPingAndScrollBarWidth.vScrollBarWidth,
    });
    // calc hidden fixed columns
    const hiddenFixedColumns = useHiddenFixedColumns({
        handledColumns,
        horizontalRange: virtual.horizontalRange,
    });

    const innerProps = {
        rowKeysObj,
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

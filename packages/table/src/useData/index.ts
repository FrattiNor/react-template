import useCalcPingAndScrollBarWidth from './useCalcPingAndScrollBarWidth';
import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useHiddenFixedColumns from './useHiddenFixedColumns';
import useChangeScrollTop from './useChangeScrollTop';
import useHandleColumns from './useHandleColumns';
import useRowSelection from './useRowSelection';
import useHandleProps from './useHandleProps';
import useResizeWidth from './useResizeWidth';
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
    const { rowKey, isEmpty, dataSource, rowSelection, autoScrollTop, rowHeight } = newProps;

    // 增加多选
    const { selectedRowKeysObj, rowSelectionColumns } = useRowSelection({ rowKey, isEmpty, dataSource, rowSelection });

    // 整合后的 columns
    const totalColumns = [...rowSelectionColumns, ...columns];

    // auto scroll top
    useChangeScrollTop({ dataSource, autoScrollTop, bodyRef });

    // title resize
    const resizeWidth = useResizeWidth();

    // ping
    const calcPingAndScrollBarWidth = useCalcPingAndScrollBarWidth({ bodyRef });

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
        rowHeight,
        dataSource,
        defaultWidth,
        totalColumns,
        bodyResizeObserver,
        bodyScrollObserver,
        calcPingAndScrollBarWidth,
        resized: resizeWidth.resized,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        defaultWidth,
        totalColumns,
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
        ...resizeWidth,
        ...hiddenFixedColumns,
        selectedRowKeysObj,
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

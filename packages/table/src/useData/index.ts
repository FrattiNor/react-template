import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useHiddenFixedColumns from './useHiddenFixedColumns';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useChangeScrollTop from './useChangeScrollTop';
import useHandleColumns from './useHandleColumns';
import useRowSelection from './useRowSelection';
import useHandleProps from './useHandleProps';
import useResizeWidth from './useResizeWidth';
import { AnyObj, TableProps } from '../type';
import useCalcPing from './useCalcPing';
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
        calcScrollBarWidth,
    });

    // virtual table core
    const virtual = useVirtual({
        rowKey,
        bodyRef,
        calcPing,
        rowHeight,
        dataSource,
        defaultWidth,
        totalColumns,
        bodyResizeObserver,
        bodyScrollObserver,
        resized: resizeWidth.resized,
    });

    // handle columns
    const { handledColumns, handledLeftColumns, handledRightColumns } = useHandleColumns({
        resizeWidth,
        defaultWidth,
        totalColumns,
        defaultFlexGrow,
        vScrollBarWidth,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
    });

    // calc hidden fixed columns
    const hiddenFixedColumns = useHiddenFixedColumns({
        handledLeftColumns,
        handledRightColumns,
        horizontalRange: virtual.horizontalRange,
    });

    const innerProps = {
        ...resizeWidth,
        ...hiddenFixedColumns,
        ping,
        handledColumns,
        vScrollBarWidth,
        selectedRowKeysObj,
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

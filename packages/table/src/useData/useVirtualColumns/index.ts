import useLeftMidRightColumns from './useLeftMidRightColumns';
import { BodyObserver } from '../useBodyObserver';
import useHandleColumns from './useHandleColumns';
import useVirtual from './useVirtual';
import { Column } from '../../type';
import { RefObject } from 'react';
import useHiddenFixed from './useHiddenFixed';

type Opt<T> = {
    rowKey: keyof T;
    dataSource?: T[];
    columns: Column<T>[];
    defaultWidth: number;
    defaultFlexGrow: number;
    bodyObserver: BodyObserver;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useVirtualColumns = <T extends Record<string, any>>(opt: Opt<T>) => {
    const { columns, rowKey, dataSource, defaultWidth, bodyObserver, defaultFlexGrow, bodyRef } = opt;

    const { leftColumns, midColumns, rightColumns } = useLeftMidRightColumns({ columns });

    const virtual = useVirtual({
        rowKey,
        bodyRef,
        dataSource,
        defaultWidth,
        bodyObserver,
        columns: [...leftColumns, ...midColumns, ...rightColumns],
    });

    const { handledColumns, handledLeftColumns, handledRightColumns } = useHandleColumns({
        midColumns,
        leftColumns,
        rightColumns,
        defaultWidth,
        defaultFlexGrow,
        vScrollBarWidth: bodyObserver.vScrollBarWidth,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
    });

    const { hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize } = useHiddenFixed({
        handledLeftColumns,
        handledRightColumns,
        horizontalRange: virtual.horizontalRange,
    });

    const _columns = {
        handledColumns,
        hiddenFixedTotalSize,
        hiddenFixedHandledLeftColumns,
        hiddenFixedHandledRightColumns,
    };

    return { virtual, _columns };
};

export default useVirtualColumns;

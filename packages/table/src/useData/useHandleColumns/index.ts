import useHiddenFixed from './useHiddenFixed';
import getHandledColumns from './utils';
import { Column } from '../../type';

export type Range = { startIndex: number; endIndex: number } | null;

export type Opt<T> = {
    defaultWidth: number;
    defaultFlexGrow: number;
    vScrollBarWidth: number;
    horizontalRange: Range;
    columns: Array<Column<T>>;
    horizontalItemSizeCache: Map<number | string, number>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T extends Record<string, any>>(opt: Opt<T>) => {
    const { handledColumns, handledLeftColumns, handledRightColumns } = getHandledColumns(opt);

    const { hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize } = useHiddenFixed({
        handledLeftColumns,
        handledRightColumns,
        horizontalRange: opt.horizontalRange,
    });

    return {
        handledColumns,
        hiddenFixedTotalSize,
        hiddenFixedHandledLeftColumns,
        hiddenFixedHandledRightColumns,
    };
};

export default useHandleColumns;

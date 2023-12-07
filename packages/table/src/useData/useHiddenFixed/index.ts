import { HandledColumn } from '../../type';

type Range = { startIndex: number; endIndex: number } | null;

type Opt<T> = {
    horizontalRange: Range;
    handledLeftColumns: HandledColumn<T>[];
    handledRightColumns: HandledColumn<T>[];
};

const useHiddenFixed = <T extends Record<string, any>>(opt: Opt<T>) => {
    const { horizontalRange, handledLeftColumns, handledRightColumns } = opt;

    const hiddenFixedHandledLeftColumns: HandledColumn<T>[] = [];
    const hiddenFixedHandledRightColumns: HandledColumn<T>[] = [];

    if (horizontalRange) {
        const { startIndex, endIndex } = horizontalRange;

        handledLeftColumns.forEach((column) => {
            if (column.index < startIndex || column.index > endIndex) {
                hiddenFixedHandledLeftColumns.push(column);
            }
        });

        handledRightColumns.forEach((column) => {
            if (column.index < startIndex || column.index > endIndex) {
                hiddenFixedHandledRightColumns.push(column);
            }
        });
    }

    const hiddenFixedTotalSize = hiddenFixedHandledLeftColumns.reduce((a, b) => a + b.width, 0);

    return { hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize };
};

export default useHiddenFixed;

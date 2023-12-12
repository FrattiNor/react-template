import { HandledColumns } from '../useHandleColumns';
import { HandledColumn } from '../../type';

type Range = { startIndex: number; endIndex: number } | null;

type Opt<T> = {
    horizontalRange: Range;
    handledColumns: HandledColumns<T>;
};

const useHiddenFixedColumns = <T>(opt: Opt<T>) => {
    const { horizontalRange, handledColumns } = opt;
    const { leftColumns, rightColumns } = handledColumns;

    const hiddenFixedHandledLeftColumns: HandledColumn<T>[] = [];
    const hiddenFixedHandledRightColumns: HandledColumn<T>[] = [];

    if (horizontalRange) {
        const { startIndex, endIndex } = horizontalRange;

        leftColumns.forEach((column) => {
            if (column.index < startIndex || column.index > endIndex) {
                hiddenFixedHandledLeftColumns.push(column);
            }
        });

        rightColumns.forEach((column) => {
            if (column.index < startIndex || column.index > endIndex) {
                hiddenFixedHandledRightColumns.push(column);
            }
        });
    }

    const hiddenFixedTotalSize = hiddenFixedHandledLeftColumns.reduce((a, b) => a + b.width, 0);

    return { hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize };
};

export type HiddenFixedColumns<T> = ReturnType<typeof useHiddenFixedColumns<T>>;
export default useHiddenFixedColumns;

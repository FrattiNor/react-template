import getHandledColumns from './utils';
import { Column } from '../../type';

export type Opt<T> = {
    resized: boolean;
    defaultWidth: number;
    defaultFlexGrow: number;
    vScrollBarWidth: number;
    totalColumns: Column<T>[];
    horizontalItemSizeCache: Map<number | string, number>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T>(opt: Opt<T>) => {
    const { handledColumns, handledLeftColumns, handledRightColumns } = getHandledColumns(opt);

    return {
        columns: handledColumns,
        leftColumns: handledLeftColumns,
        rightColumns: handledRightColumns,
    };
};

export type HandledColumns<T> = ReturnType<typeof useHandleColumns<T>>;
export default useHandleColumns;

import getHandledColumns from './utils';
import { Column } from '../../../type';

export type Opt<T> = {
    defaultWidth: number;
    defaultFlexGrow: number;
    vScrollBarWidth: number;
    midColumns: Array<Column<T>>;
    leftColumns: Array<Column<T>>;
    rightColumns: Array<Column<T>>;
    horizontalItemSizeCache: Map<number | string, number>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T extends Record<string, any>>(opt: Opt<T>) => {
    const { handledColumns, handledLeftColumns, handledRightColumns } = getHandledColumns(opt);

    return {
        handledColumns,
        handledLeftColumns,
        handledRightColumns,
    };
};

export default useHandleColumns;

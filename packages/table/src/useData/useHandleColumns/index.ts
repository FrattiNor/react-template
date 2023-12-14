import { ResizeWidth } from '../useResizeWidth';
import getHandledColumns from './utils';
import { Column } from '../../type';

type Range = { startIndex: number; endIndex: number } | null;

export type Opt<T> = {
    defaultWidth: number;
    horizontalRange: Range;
    defaultFlexGrow: number;
    vScrollBarWidth: number;
    resizeWidth: ResizeWidth;
    totalColumns: Column<T>[];
    ping: Record<string, number>;
    horizontalItemSizeCache: Map<number | string, number>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T>(opt: Opt<T>) => {
    return getHandledColumns(opt);
};

export default useHandleColumns;

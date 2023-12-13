import { ResizeWidth } from '../useResizeWidth';
import getHandledColumns from './utils';
import { Column } from '../../type';

export type Opt<T> = {
    defaultWidth: number;
    defaultFlexGrow: number;
    vScrollBarWidth: number;
    resizeWidth: ResizeWidth;
    totalColumns: Column<T>[];
    horizontalItemSizeCache: Map<number | string, number>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T>(opt: Opt<T>) => {
    return getHandledColumns(opt);
};

export default useHandleColumns;

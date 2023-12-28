import { ResizeWidth } from '../useResizeWidth';
import { VirtualCore } from '../useVirtual';
import getHandledColumns from './utils';
import { Column } from '../../type';

export type Opt<T> = {
    virtual: VirtualCore;
    defaultWidth: number;
    defaultFlexGrow: number;
    resizeWidth: ResizeWidth;
    sortedColumns: Column<T>[];
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T>(opt: Opt<T>) => {
    return getHandledColumns(opt);
};

export default useHandleColumns;

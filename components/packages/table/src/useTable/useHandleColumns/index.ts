import { ResizeWidth } from '../useResizeWidth';
import { VirtualCore } from '../useVirtual';
import getHandledColumns from './utils';
import { TableColumns } from '../../type';

export type Opt<T> = {
    virtual: VirtualCore;
    resizeWidth: ResizeWidth;
    sortedColumns: TableColumns<T>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T>(opt: Opt<T>) => {
    return getHandledColumns(opt);
};

export default useHandleColumns;

import { VirtualItem } from '@tanstack/react-virtual';
import { HandledColumn } from '../../type';

type Opt<T> = {
    horizontalVirtualItems: VirtualItem[];
    handledLeftColumns: HandledColumn<T>[];
    handledRightColumns: HandledColumn<T>[];
};

const useVirtualFixed = <T extends Record<string, any>>(opt: Opt) => {
    return {};
};

export default useVirtualFixed;

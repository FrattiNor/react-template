import { TableColumnsConfItem } from '../../type';
import { VirtualCore } from '../useVirtual';

type Opt = {
    virtual: VirtualCore;
    setColumnsConf: (v: Record<string, TableColumnsConfItem>) => void;
};

const useSetColumnsConf = (opt: Opt) => {
    const { virtual, setColumnsConf } = opt;
    const newSetColumnsConf = (v: Record<string, TableColumnsConfItem>) => {
        // 改变列配置前修改横向宽度缓存
        Object.entries(v).forEach(([key, { width }]) => {
            virtual.horizontalItemSizeCache.set(key, width);
        });
        setColumnsConf(v);
    };
    return { newSetColumnsConf };
};

export default useSetColumnsConf;

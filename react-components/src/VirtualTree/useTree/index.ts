import useData from './useData';
import useSearch from './useSearch';
import useSelect from './useSelect';
import useVirtual from './useVirtual';
import useVisibles from './useVisibles';

import type { AnyObj, VirtualTreeFieldKeys, VirtualTreeProps } from '../type';

export const defaultFieldKeys: VirtualTreeFieldKeys<any> = {
    key: 'key',
    label: 'label',
    children: 'children',
};

const useTree = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
    const { visibles, setVisibles, closeAll, openAll, atLeastOneOpen } = useVisibles(props);
    const { showData, isEmpty } = useData({ props, visibles });
    const { virtual, virtualizer, virtualWrapperRef, lineHeight } = useVirtual(showData);
    const { selectedKey, setSelectedKey } = useSelect({ props, visibles, setVisibles, virtualizer });
    const { keyword, search } = useSearch({ props, visibles, setVisibles, virtualizer });

    return {
        isEmpty,
        virtual,
        showData,
        visibles,
        lineHeight,
        virtualWrapperRef,
        setVisibles,
        selectedKey,
        setSelectedKey,
        search,
        keyword,
        closeAll,
        openAll,
        atLeastOneOpen,
    };
};

export default useTree;

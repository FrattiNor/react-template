import useSearch from './useSearch';
import useVirtual from './useVirtual';
import type { AnyObj, VirtualTreeSelectFieldKeys, VirtualTreeSelectProps } from '../type';

export const defaultFieldKeys: VirtualTreeSelectFieldKeys<any> = {
    key: 'key',
    label: 'label',
    children: 'children',
};

const useSelect = <T extends AnyObj>(props: VirtualTreeSelectProps<T>) => {
    const { selectedKeys, setSelectedKeys, showData, visibles, setVisibles } = useSearch({ props });

    const { virtual, virtualWrapperRef, lineHeight } = useVirtual({ showData });

    const isEmpty = !(Array.isArray(showData) && showData.length > 0);

    return {
        props,
        isEmpty,
        virtual,
        visibles,
        showData,
        setVisibles,
        lineHeight,
        selectedKeys,
        setSelectedKeys,
        virtualWrapperRef,
    };
};

export default useSelect;

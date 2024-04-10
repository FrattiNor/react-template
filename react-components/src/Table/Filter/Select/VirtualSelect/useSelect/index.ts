import { useMergeState } from '@react/hooks';

import useSearch from './useSearch';
import useVirtual from './useVirtual';
import type { AnyObj, VirtualSelectFieldKeys, VirtualSelectProps } from '../type';

export const defaultFieldKeys: VirtualSelectFieldKeys<any> = {
    key: 'key',
    label: 'label',
};

const useSelect = <T extends AnyObj>(props: VirtualSelectProps<T>) => {
    const { showData } = useSearch({ props });

    const { virtual, virtualWrapperRef, lineHeight } = useVirtual({ showData });

    const [selectedKeys, setSelectedKeys] = useMergeState<string[]>({
        defaultValue: [],
        state: props.selectedKeys,
        setState: props.setSelectedKeys,
    });

    const isEmpty = !(Array.isArray(showData) && showData.length > 0);

    return {
        props,
        isEmpty,
        virtual,
        showData,
        lineHeight,
        selectedKeys,
        setSelectedKeys,
        virtualWrapperRef,
    };
};

export default useSelect;

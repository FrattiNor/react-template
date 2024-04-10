import useSearch from './useSearch';
import useSelect from './useSelect';
import useVirtual from './useVirtual';
import type { AnyObj, VirtualListFieldKeys, VirtualListProps } from '../type';

export const defaultFieldKeys: VirtualListFieldKeys<any> = {
    key: 'key',
    label: 'label',
};

const useList = <T extends AnyObj>(props: VirtualListProps<T>) => {
    const { data } = props;
    const isEmpty = Array.isArray(data) ? data.length === 0 : true;
    const { virtual, virtualizer, virtualWrapperRef, lineHeight } = useVirtual(data);
    const { selectedKey, setSelectedKey } = useSelect({ props, virtualizer });
    const { search, keyword } = useSearch({ props, virtualizer });

    const getKeyLabelDisabled = (item: T) => {
        const { key: FKey = 'key', label: FLabel = 'label', disabled: FDisabled } = props.fieldKeys || {};
        const key = item?.[FKey];
        const label = item?.[FLabel];
        const disabled = FDisabled ? (typeof FDisabled === 'function' ? FDisabled(item) : item?.[FDisabled]) : false;
        return { key, label, disabled };
    };

    return {
        search,
        keyword,
        props,
        isEmpty,
        virtual,
        lineHeight,
        virtualWrapperRef,
        getKeyLabelDisabled,
        selectedKey,
        setSelectedKey,
    };
};

export default useList;

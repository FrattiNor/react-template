import useSelect from './useSelect';
import useVirtual from './useVirtual';
import { AnyObj, VirtualListProps } from '../type';

const useTree = <T extends AnyObj>(props: VirtualListProps<T>) => {
    const { data } = props;
    const select = useSelect(props);
    const { virtual, wrapperRef, lineHeight } = useVirtual(data);
    const isEmpty = Array.isArray(data) ? data.length === 0 : true;

    const getKeyLabelDisabled = (item: T) => {
        const { key: FKey = 'key', label: FLabel = 'label', disabled: FDisabled } = props.fieldKeys || {};
        const key = item?.[FKey];
        const label = item?.[FLabel];
        const disabled = FDisabled ? (typeof FDisabled === 'function' ? FDisabled(item) : item?.[FDisabled]) : false;
        return { key, label, disabled };
    };

    return {
        props,
        isEmpty,
        virtual,
        lineHeight,
        wrapperRef,
        getKeyLabelDisabled,
        ...select,
    };
};

export default useTree;

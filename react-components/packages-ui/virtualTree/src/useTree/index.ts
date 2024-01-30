import useData from './useData';
import useSelect from './useSelect';
import useVirtual from './useVirtual';
import { AnyObj, VirtualTreeProps } from '../type';

const useTree = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
    const select = useSelect(props);
    const { showData, visibles, setVisibles, isEmpty } = useData(props);
    const { virtual, wrapperRef, lineHeight } = useVirtual(showData);

    return {
        props,
        isEmpty,
        virtual,
        showData,
        visibles,
        lineHeight,
        wrapperRef,
        setVisibles,
        ...select,
    };
};

export default useTree;

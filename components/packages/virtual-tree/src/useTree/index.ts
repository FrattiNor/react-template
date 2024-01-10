import { AnyObj, VirtualTreeProps } from '../type';
import useVirtual from './useVirtual';
import useData from './useData';

const useTree = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
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
    };
};

export default useTree;

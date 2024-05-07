import { useEffectOnce, useMergeState } from '@react/hooks';

import { findLevelParentKeys, getAllParentKeys } from './utils';

import type { AnyObj, VirtualTreeProps } from '../../type';

const useVisibles = <T extends AnyObj>(props: VirtualTreeProps<T>) => {
    const { data, fieldKeys, defaultVisibleLevel, defaultVisibles } = props;

    const [visibles, setVisibles] = useMergeState<Record<string, boolean>>({
        defaultValue: {},
        state: props.visibles,
        setState: props.setVisibles,
    });

    useEffectOnce(() => {
        if (defaultVisibles) setVisibles(defaultVisibles);
    }, [!!defaultVisibles]);

    useEffectOnce(() => {
        if (data) {
            if (typeof defaultVisibleLevel === 'number') {
                const levelParentKeys = findLevelParentKeys({ data, fieldKeys, defaultVisibleLevel });
                setVisibles(levelParentKeys);
            }
        }
    }, [!!data]);

    const closeAll = () => {
        setVisibles({});
    };

    const openAll = () => {
        if (data) {
            const allParentKeys = getAllParentKeys({ data, fieldKeys });
            setVisibles(allParentKeys);
        }
    };

    const atLeastOneOpen = Object.keys(visibles).length > 0;

    return { visibles, setVisibles, closeAll, openAll, atLeastOneOpen };
};

export default useVisibles;

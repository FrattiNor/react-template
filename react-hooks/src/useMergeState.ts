import { Dispatch, SetStateAction, useState } from 'react';

type Opt<T> = {
    state?: T;
    defaultValue: T | (() => T);
    setState?: Dispatch<SetStateAction<T>> | Dispatch<T>;
};

const useMergeState = <T>(opt: Opt<T>) => {
    const { defaultValue, state: _state, setState: _setState } = opt;
    const [__state, __setState] = useState<T>(defaultValue);
    const state = _state ?? __state;
    const setState = _setState ?? __setState;
    return [state, setState] as const;
};

export default useMergeState;

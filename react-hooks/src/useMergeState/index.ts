import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

function useMergeState<T>(opt: { state?: T; defaultValue: T | (() => T); setState?: Dispatch<SetStateAction<T>> }): [T, Dispatch<SetStateAction<T>>];

function useMergeState<T>(opt: { state?: T; defaultValue: T | (() => T); setState?: Dispatch<T> }): [T, Dispatch<T>];

function useMergeState<T>(opt: { state?: T; defaultValue: T | (() => T); setState?: Dispatch<SetStateAction<T>> | Dispatch<T> }) {
    const { defaultValue, state: _state, setState: _setState } = opt;
    const [__state, __setState] = useState<T>(defaultValue);
    const state = _state ?? __state;
    const setState = _setState ?? __setState;
    return [state, setState] as const;
}

export default useMergeState;

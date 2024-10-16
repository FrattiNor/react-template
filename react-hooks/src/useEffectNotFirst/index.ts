import { type DependencyList, type EffectCallback, useEffect, useRef } from 'react';

const useEffectNotFirst = (effect: EffectCallback, deps?: DependencyList): void => {
	const firstRef = useRef(true);

	useEffect(() => {
		if (firstRef.current === true) {
			firstRef.current = false;
		} else {
			return effect();
		}
	}, deps);
};

export default useEffectNotFirst;

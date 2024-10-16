import { type EffectCallback, useEffect, useRef } from 'react';

const useEffectOnce = (effect: EffectCallback, deps: [boolean]): void => {
	const flagRef = useRef(true);

	useEffect(() => {
		if (deps[0] === true) {
			if (flagRef.current === true) {
				flagRef.current = false;
				effect();
			}
		}
	}, deps);
};

export default useEffectOnce;

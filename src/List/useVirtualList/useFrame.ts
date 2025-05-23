import { useRef } from 'react';

const useFrame = () => {
	const endCallbackRef = useRef<Record<string, () => void>>({});
	const ref = useRef<Record<string, ReturnType<typeof requestAnimationFrame>>>({});

	const oneFrame = (key: string, callback: () => void) => {
		if (ref.current[key] === undefined) {
			callback();
			ref.current[key] = requestAnimationFrame(() => {
				delete ref.current[key];
				if (endCallbackRef.current[key]) {
					endCallbackRef.current[key]();
					delete endCallbackRef.current[key];
				}
			});
		} else {
			endCallbackRef.current[key] = callback;
		}
	};

	return oneFrame;
};

export default useFrame;

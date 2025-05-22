import { useRef } from 'react';

const useFrame = () => {
	const ref = useRef<Record<string, ReturnType<typeof requestAnimationFrame>>>({});

	const oneFrame = (key: string, callback: () => void) => {
		if (ref.current[key] === undefined) {
			callback();
			ref.current[key] = requestAnimationFrame(() => delete ref.current[key]);
		}
	};

	return oneFrame;
};

export default useFrame;

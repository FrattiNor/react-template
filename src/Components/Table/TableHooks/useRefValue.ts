import { useRef } from 'react';

const useRefValue = <T>(value: T) => {
	const ref = useRef(value);
	// eslint-disable-next-line react-hooks/refs
	if (ref.current !== value) ref.current = value;
	const getValue = () => ref.current;
	return [getValue] as [() => T];
};

export default useRefValue;

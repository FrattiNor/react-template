import { useRef } from 'react';

function useMergeRef<T>(__ref?: React.ForwardedRef<T>) {
	const _ref = useRef(null);
	const ref = __ref ?? _ref;
	return ref as React.MutableRefObject<T>;
}

export default useMergeRef;

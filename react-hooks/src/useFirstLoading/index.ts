import { useMemo, useRef } from 'react';

const useFirstLoading = (loading: boolean) => {
	const flag = useRef(0);

	const firstLoading = useMemo(() => {
		if (loading === true && flag.current === 0) {
			flag.current = flag.current + 1;
			return true;
		} else {
			return false;
		}
	}, [loading]);

	return firstLoading;
};

export default useFirstLoading;

import { useEffect, useState } from 'react';

const useSearchState = <T>(defaultState: T, searchKey = 'pageType') => {
	const [state, setState] = useState<T>(() => {
		const url = new URL(window.location.href);
		const searchPageTypeArr = url.searchParams.getAll(searchKey);
		if (searchPageTypeArr.length > 0) {
			const searchPageType = searchPageTypeArr[searchPageTypeArr.length - 1];
			return searchPageType as T;
		}
		return defaultState;
	});

	// 清除url中的pageType【放在useState的初始化函数中会执行多次】
	useEffect(() => {
		const url = new URL(window.location.href);
		const searchPageTypeArr = url.searchParams.getAll(searchKey);
		if (searchPageTypeArr.length > 0) {
			url.searchParams.delete(searchKey);
			window.history.replaceState(null, '', url.toString());
		}
	}, []);

	return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export default useSearchState;
